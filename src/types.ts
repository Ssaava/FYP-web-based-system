export interface AuthSliceState {
  authenticating: boolean;
  authenticated: boolean;
  user: object | any;
  token: {
    value: string;
    expiresAt: number;
  };
  login: (data: UserLogin) => void;
  logout: () => void;
  signin: (data: UserObject) => void;
  refreshAuthToken: () => void;
  checkAuth: () => void;
}
export type UserObject = {
  email: string;
  password: string;
};
export type UserLogin = {
  email: string;
  password: string;
};
