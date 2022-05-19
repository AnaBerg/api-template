import { add } from "date-fns";
import { encode, TAlgorithm } from "jwt-simple";

import { IEncodeResult } from "../entities/common/codification";
import { ISession, PartialSession } from "../entities/common/session";

const encodeSession = (secretKey: string, partialSession: PartialSession): IEncodeResult => {
  const algorithm: TAlgorithm = "HS512";
  const issued: Date = new Date();
  const expires: Date = add(issued, { minutes: 15 });
  
  const session: ISession = {
    ...partialSession,
    expires,
    issued
  }

  return {
    token: encode(session, secretKey, algorithm),
    issued,
    expires
  }
}

export default encodeSession;