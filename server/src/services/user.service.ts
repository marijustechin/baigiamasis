import ApiError from '../errors/api.errors';
import { createUser, getUserByEmail } from '../models/user.model';
import { authentication, random } from './auth.service';

export default class UserService {
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ username: string; email: string }> {
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

    return user;
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ email: string; username: string; sessionToken: string }> {
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user || !user.authentication)
      throw ApiError.BadRequest('Incorect user email or password');

    if (!user.authentication.salt)
      throw ApiError.BadRequest('Here we need some improvement');

    const expectedHash = authentication(user.authentication?.salt, password);

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
      username: user.username,
      email: user.email,
      sessionToken: user.authentication.sessionToken,
    };
  }
}
