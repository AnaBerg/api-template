export interface ISession {
  id: string;
  createdAt: Date;
  user: string;
  type: string;
  issued: Date;
  expires: Date;
}

export type PartialSession = Omit<ISession, "issued" | "expires">;

export type ExpirationStatus = "expired" | "active" | "grace";