import { Request, Response, NextFunction } from "express";

import decodeSession from "./decoding";
import expirationCheckStatus from "./expiration_check_status";
import encodeSession from "./encoding";

import { DecodeResult } from "../entities/common/codification";
import { ExpirationStatus, ISession } from "../entities/common/session";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const unauthorized = (message: string) => res.status(401).json({
    ok: false,
    status: 401,
    message: message
  });

  const secretKey = process.env.TOKEN_KEY as string;

  const requestHeader = "X-JWT-Token";
  const responseHeader = "X-Renewd-JWT-Token";
  const header = req.header(requestHeader);

  let session: ISession;
  
  if (header) {
    const decodedSession: DecodeResult = decodeSession(secretKey, header);

    if (decodedSession.type === "valid") {
      const expiration : ExpirationStatus = expirationCheckStatus(decodedSession.session);

      if (expiration === "active") {
        session = decodedSession.session;
      } else if (expiration === "grace") {
        const { token, expires, issued } = encodeSession(secretKey, decodedSession.session);

        session = {
          ...decodedSession.session,
          expires,
          issued
        }

        res.setHeader(responseHeader, token);
      } else {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
      }
    } else {
      unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
      return;
    }
  } else {
    unauthorized(`Required ${requestHeader} header not found`);
    return;
  }

  res.locals = {
    ...res.locals,
    session,
  }

  next();
}

export default authorization;