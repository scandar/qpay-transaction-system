import debug from 'debug';
import mongoose from 'mongoose';

const log = debug('app:routes:controllerHandler');

const mongodb = async () => {
  let conncetionString = 'mongodb://';

  // Set DB username and password
  conncetionString = process.env.DB_USER && process.env.DB_PASSWORD
    ? `${conncetionString}${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
    : conncetionString;

  // set DB host, port and name
  conncetionString += `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  if (!conncetionString) return log('no database specified');

  // Initiating connection with MongoDB
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(conncetionString, { useNewUrlParser: true });
  log('connected to database');
  return true;
};

const connection = () => {
  if (process.env.DB_TYPE === 'mongodb') mongodb();
};


export default connection;
