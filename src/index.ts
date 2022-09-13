import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express = require("express");
import { Application, Express, Request, Response } from "express";
const app: Application = express();
const PORT = 9000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
import getRefreshTokenUseCase from "./app/useCases/users/getRefreshToken.useCase";
import getAccessTokenUseCase from "./app/useCases/users/getAccessToken.useCase";
import getAllUsersAccountsUseCase from "./app/useCases/users/getAllUsersAccounts.useCase";
import getAllUsersTransactionUseCase from "./app/useCases/users/getAllUsersTransaction.useCase";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/login", async (req: Request, res: Response) => {
  const response = await getRefreshTokenUseCase(
    req.body.user,
    req.body.password
  );
  const refresh_token = response.content.response.refresh_token;
  const response2 = await getAccessTokenUseCase(refresh_token);
  const access_token = response2.content.response.access_token;
  const response3 = await getAllUsersAccountsUseCase(access_token);
  const accounts = response3.content.account;

  const total = await Promise.all(
    accounts.map(async (account) => {
      const response4 = await getAllUsersTransactionUseCase(
        account.acc_number,
        access_token
      );
      const transactions = response4.content.transactions;
      const result = { ...account, transactions };
      return result;
    })
  );

  res.json({ status: 200, allTransactions: total });
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
