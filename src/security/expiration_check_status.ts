import { isBefore, add, isAfter } from "date-fns";
import { ExpirationStatus, ISession } from "../entities/common/session";

const expirationCheckStatus = (token: ISession): ExpirationStatus => {
  const now = new Date() as Date;
  const threeHoursAfter = add(token.expires, { hours: 3 }) as Date;

  console.log(isBefore(now, token.expires));

  if (isBefore(now, token.expires)) {
    return "active";
  } else if (isAfter(now, threeHoursAfter)) {
    return "grace";
  } else {
    return "expired";
  }
}

export default expirationCheckStatus;