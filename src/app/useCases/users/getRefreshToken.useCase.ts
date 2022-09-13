import axios from "axios";
import Response from "../../framworks/common/response";
import ResponseError from "../../framworks/common/responseError";
import UserQuery from "../../models/user.interface";
var base64 = require("base-64");

export default async (login, password): Promise<Response> => {
  const users = await axios.get(`${process.env.BASE_URL}/myInfos.json`);

  const user = users.data.users.find((u) => u.login === login);

  if (!user) {
    return new Response({
      status: 404,
      error: new ResponseError({
        error: "Login doesn't exit",
        msg: "We don't find this login in the database, please use other data.",
      }),
    });
  }

  if (user.password !== password) {
    return new Response({
      status: 401,
      error: new ResponseError({
        error: "Bad password",
        msg: "Try to enter the good password",
      }),
    });
  }

  const encodedBasic = base64.encode(`${user.clientId}:${user.clientSecret}`);
  const response = await axios.post(
    `${process.env.BASE_SERVER}/login`,
    {
      user: login,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedBasic}`,
      },
    }
  );

  return new Response({ status: 200, content: { response: response.data } });
};
