import IConfig from './IConfig';
import { config } from 'dotenv';

config();

const configuration : IConfig = {

    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL,


};

export default configuration;