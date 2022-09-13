import axios from "axios";
import Response from "../../framworks/common/response";
import ResponseError from "../../framworks/common/responseError";

export default async (access_token): Promise<Response> => {
  const response = await axios.get(`${process.env.BASE_SERVER}/accounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return new Response({ status: 200, content: response.data });
};
