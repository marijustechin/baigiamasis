import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app';
import mongoose from 'mongoose';
import SystemService from './services/system.service';

const PORT = process.env.PORT ?? 3003;

const server = http.createServer(app);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI nėra .env faile');
  process.exit(1);
}

mongoose.Promise = Promise;
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('🟢️ Prisijungiau prie MongoDB');

    if (process.env.SEED_ADMIN === 'true') await SystemService.seedAdmin();

    server.listen(PORT, () => {
      console.log(`👽️ Serveris klauso ${PORT} prievadą`);
    });
  })
  .catch((err) => {
    console.error('[MongoDB] nepavyko prisijungti: ', err);
    process.exit(1);
  });

mongoose.connection.on('error', (error: Error) =>
  console.log(`[DB] prisijungimo klaida: ${error}`)
);
