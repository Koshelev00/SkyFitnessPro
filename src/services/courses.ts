import axios from 'axios';
import { BASE_URL, RoutesApp } from '../constants';



type ApiError = {
  error?: string;
  message?: string;
};

type authUserReturn = {
    token: string;
};

type authUserProp = {
  email: string;
  password: string;
};




export async function signIn(userData: authUserProp): Promise<authUserReturn> {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.login}`, userData, {
      headers: {
        'Content-Type': 'application/javascript',
      },
    });
     const { token } = data.data;
    if (token) {
      localStorage.setItem('authToken', token);
     
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка входа');
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
}

export async function signUp(userData: {
  email: string;
  password: string;
}): Promise<authUserReturn> {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.sighup}`, userData, {
      headers: {
        'Content-Type': 'application/javascript',
      },
    });

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка регистрации');
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
}



