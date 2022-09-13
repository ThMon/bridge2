import axios from "axios";
import Response from "../../framworks/common/response";
import ResponseError from "../../framworks/common/responseError";
const querystring = require("querystring");

export default async (refresh_token): Promise<Response> => {
  const response = await axios.post(
    `${process.env.BASE_SERVER}/token`,
    querystring.stringify({ grant_type: "refresh_token", refresh_token }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic`,
      },
    }
  );

  return new Response({ status: 200, content: { response: response.data } });
};
