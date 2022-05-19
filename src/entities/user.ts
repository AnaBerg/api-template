export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPost {
  name: string;
  email: string;
  password: string;
  type: string;
}