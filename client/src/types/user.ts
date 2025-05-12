export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  success: boolean;
  data: IUser;
}
