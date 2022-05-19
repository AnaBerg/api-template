import { decode, TAlgorithm } from "jwt-simple";

import { DecodeResult } from "../entities/common/codification";
import { ISession } from "../entities/common/session";

const decodeSession = (secretKey: string, sessionToken: string): DecodeResult => {
  const algorithm: TAlgorithm = "HS512";
  let result: ISession;

  try {
    result = decode(sessionToken, secretKey, false, algorithm);
    return {
      type: 'valid',
      session: result
    }
  } catch (e) {
    const error: Error = e as Error;

    if (error.message === "No token supplied" || error.message === " Not enough or too many segments" || error.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token"
      }
    } else if (error.message === "Signature verification falied" || error.message === "Algorithm not supported") {
      return {
        type: "integrity-error"
      }
    }
  }
  return {
    type: "invalid-token"
  }
}

export default decodeSession;