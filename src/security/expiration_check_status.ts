import { isBefore, add } from "date-fns";
import { ExpirationStatus, ISession } from "../entities/common/session";

const expirationCheckStatus = (session: ISession): ExpirationStatus => {
  const now: Date = new Date();
  const expires: Date = new Date(session.expires);
  const threeHoursAfter: Date = add(expires, { hours: 3 });

  if (isBefore(now, expires)) {
    return "active";
  } else if (isBefore(threeHoursAfter, now)) {
    return "grace";
  } else {
    return "expired";
  }
}

export default expirationCheckStatus;