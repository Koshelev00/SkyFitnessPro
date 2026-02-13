export type UserType = {
  email: string;
  username: string;
  _id: number;
};

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface AuthUserReturn {
  token: string;
  user: UserType;
}

export interface AuthUserProp {
  email: string;
  password: string;
}