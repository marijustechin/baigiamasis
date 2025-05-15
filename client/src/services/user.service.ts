import $axios from '../config/api';
import type { IAuthResponse, IUser } from '../types/user';

interface IAllUsers {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: IUser[];
}

interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: string;
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

  // query ?page=1&limit=2&search=ar&sortBy=username&sortOrder=asc&role=USER

  static async getAllUsers({
    page = 1,
    limit = 10,
    search = '',
    role,
    sortBy = 'username',
    sortOrder = 'desc',
  }: QueryOptions): Promise<IAllUsers> {
    const response = await $axios.get('/user', {
      params: {
        page,
        limit,
        search,
        role,
        sortBy,
        sortOrder,
      },
    });
    return response.data.data;
  }
}
