import UserQuery from "../models/user.interface";

export default class User implements UserQuery {
  clientid: string;
  login: string;
  password: string;
  clientSecret: string;

  constructor({
    clientid,
    login,
    password,
    clientSecret,
  }: {
    clientid?: string | undefined;
    login: string;
    password: string;
    clientSecret?: string | undefined;
  }) {
    this.clientid = clientid;
    this.login = login;
    this.password = password;
    this.clientSecret = clientSecret;
  }
}
