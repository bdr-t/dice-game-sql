const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_CLIENT: Joi.string().required().description('Sql client'),
    DB_HOST: Joi.string().required().description('Sql host'),
    DB_USER: Joi.string().required().description('Sql user'),
    DB_PASSWORD: Joi.required().description('Sql password'),
    DB_NAME: Joi.string().required().description('database name'),
    DB_PORT: Joi.number().default(3306),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(60).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    name: envVars.DB_NAME + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    client: envVars.DB_CLIENT,
    host: envVars.DB_CLIENT,
    user: envVars.DB_HOST,
    password: envVars.DB_PASSWORD,
    port: envVars.DB_PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
