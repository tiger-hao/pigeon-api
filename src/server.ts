import express from 'express';
import mongoose, { ConnectionOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { rootRouter } from './routes/rootRoute';
import { usersRouter } from './routes/usersRoute';
import { authRouter } from './routes/authRoute';

dotenv.config();

if (!process.env.PORT || !process.env.MONGO_DB_URI) {
  throw new Error("Missing environment variables");
}

const API_PORT = process.env.PORT;
const DB_URI = process.env.MONGO_DB_URI;

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.connect(DB_URI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("Connected to database");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
