import * as dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default () => ({
  port: process.env.PORT || 5001,
  api: {
    prefix: process.env.API_PREFIX,
  },
  mysqlConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT || 3306),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 15,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRES_TIME,
  },
  dbConfig: {
    type: 'mysql',
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    poolSize: Number(process.env.WRITE_MAX_CON || 5),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  },
});
