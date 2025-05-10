import app from './app';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import SystemService from './services/system.service';

dotenv.config();
const PORT = process.env.PORT ?? 3003;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `👽️ Incredible MarijusTechin server is running on port: ${PORT}`
  );
});

mongoose.Promise = Promise;
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri);
  if (process.env.SEED_ADMIN === 'true') SystemService.seedAddmin();
} else {
  console.error('❌ MONGO_URI string is missing in .env');
  process.exit(1);
}

mongoose.connection.on('error', (error: Error) =>
  console.log(`DB connection error: ${error}`)
);
