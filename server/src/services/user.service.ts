import ApiError from '../errors/api.errors';
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
} from '../models/user.model';
import { authentication, random } from './auth.service';

export default class UserService {
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ _id: string; username: string; email: string }> {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw ApiError.Conflict('Existing email');
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  }

  static async login(
    email: string,
    password: string
  ): Promise<{
    userData: {
      _id: string;
      username: string;
      email: string;
      role: string;
    };
    userToken: string;
  }> {
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user || !user.authentication)
      throw ApiError.BadRequest('Incorect user email or password');

    if (!user.authentication.salt)
      throw ApiError.BadRequest('Here we need some improvement');

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash)
      throw ApiError.BadRequest('Incorect user email or password');

    // Jei viskas ok, sukuriam sessionToken
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    return {
      userData: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      userToken: user.authentication.sessionToken,
    };
  }

  static async getAllUsers() {
    const allUsers = await getUsers();

    return allUsers;
  }

  static async deleteUser(id: string) {
    // ar toks yra?
    const user = await getUserById(id);

    if (!user) throw ApiError.NotFound();

    return await deleteUser(id);
  }
}
