import { createUser, getUserByEmail } from '../models/user.model';
import { authentication, random } from './auth.service';

export default class SystemService {
  static async seedAddmin() {
    const existingAdmin = await getUserByEmail('admin@pastas.lt');

    if (existingAdmin) {
      console.log(
        '‼️ Admin user already exists\n You can change SEED_ADMIN to fasle'
      );
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
