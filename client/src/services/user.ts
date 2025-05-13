import $axios from '../config/api';
import type { IAuthResponse, IUser } from '../types/user';

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

  static async getAllUsers(): Promise<IUser[]> {
    const response = await $axios.get('/user');

    return response.data;
  }
}
