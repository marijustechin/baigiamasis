import app from './app';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import SystemService from './services/system.service';

dotenv.config();
const PORT = process.env.PORT ?? 3003;

const server = http.createServer(app);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MONGO_URI string is missing in .env');
  process.exit(1);
}

mongoose.Promise = Promise;
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('🟢️ Connected to MongoDB');

    if (process.env.SEED_ADMIN === 'true') await SystemService.seedAdmin();

    server.listen(PORT, () => {
      console.log(
        `👽️ Incredible MarijusTechin server is running on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

mongoose.connection.on('error', (error: Error) =>
  console.log(`DB connection error: ${error}`)
);
