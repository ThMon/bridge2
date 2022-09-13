export default interface UserQuery {
  clientid?: string | undefined;
  login: string;
  password: string;
  clientSecret?: string | undefined;
}
