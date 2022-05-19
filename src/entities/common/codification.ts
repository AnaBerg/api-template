import { ISession } from "./session";

export interface IEncodeResult {
  token: string;
  expires: Date;
  issued: Date;
}

export type DecodeResult = {
  type: "valid";
  session: ISession;
} | {
  type: "integrity-error";
}
| {
  type: "invalid-token";
};