import $axios from '../config/api';

interface IAuthResponse {
  success: boolean;
  data: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}

export default class UserService {
  static async login(email: string, password: string): Promise<IAuthResponse> {
    const response = await $axios.post('/user/login', { email, password });
    return response.data;
  }

  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    const response = await $axios.post('/user/register', {
      username,
      email,
      password,
    });
    return response.data;
  }
}
