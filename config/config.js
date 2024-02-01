var dotenv = require('dotenv');
dotenv.config();

const env = (process.env.APP_ENV === undefined) ? 'dev' : process.env.APP_ENV;

module.exports = {
    APP_ENV: env || 'dev', 
    PORT: process.env.PORT || 8000,
    API_PREFIX: process.env.API_PREFIX || 'api',
    DB_DIALECT: process.env.DB_DIALECT || 'mongo',
    DB_HOST: process.env.DB_HOST || 'mongodb+srv://alessa_admin:ZelYzPW9IRueGlAP@cluster0.nnefb.mongodb.net/al_essa_crm_db?retryWrites=true&w=majority',
    DB_NAME: process.env.DB_NAME || 'Likewise',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'y7z27tQdwER6Knk8',
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/Likewise',
    JWT_SECRET: process.env.JWT_SECRET || 'WpDmcvTCzTfm7g7o',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || 10000,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    jwtSecretKey: 'LikeWise'
};