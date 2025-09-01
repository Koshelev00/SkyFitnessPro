import axios from "axios";
import { BASE_URL, RoutesApp } from "@/constants";



export type AuthUserReturn = {
  token: string;
};

export type AuthUserProp = {
  email: string;
  password: string;
};

export async function SignIn(userData: AuthUserProp): Promise<AuthUserReturn> {
  const { data } = await axios.post(
    `${BASE_URL}${RoutesApp.login}`,
    userData,
    {
      headers: { "Content-Type": "application/javascript" },
    }
  );

  return data;
}

export async function SignUp(userData: AuthUserProp): Promise<AuthUserReturn> {
  const { data } = await axios.post(
    `${BASE_URL}${RoutesApp.signup}`,
    userData,
    {
      headers: { "Content-Type": "application/javascript" },
    }
  );

  return data;
}

export async function getUserProfile(token: string) {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getUserProfile}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
