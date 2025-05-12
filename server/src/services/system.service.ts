import { createUser, getUserByEmail } from '../models/user.model';
import { authentication, random } from './auth.service';

export default class SystemService {
  static async seedAdmin() {
    const existingAdmin = await getUserByEmail('admin@pastas.lt');

    if (existingAdmin) {
      console.log('‼️ Admin exists — set SEED_ADMIN=false in your .env');
      return;
    }

    const salt = random();

    await createUser({
      email: 'admin@pastas.lt',
      username: 'Admin',
      role: 'ADMIN',
      authentication: {
        salt,
        password: authentication(salt, 'admin'),
      },
    });

    console.log('😎️ Default admin user created: admin / admin');
  }
}
