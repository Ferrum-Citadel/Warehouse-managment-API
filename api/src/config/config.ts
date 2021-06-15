// Get MySwl parameters from .env
const MYSQL_HOST = process.env.DB_HOST;
const MYSQL_DATABASE = process.env.DB_NAME;
const MYSQL_USER = process.env.DB_USER;
const MYSQL_PASS = process.env.DB_PWD;

// Set up MySql config
const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
};

// Server config
const SERVER_HOSTNAME = process.env.HOST ?? 'localhost';
const SERVER_PORT = process.env.PORT ?? 5001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

// Exporting in the same object
const config = {
  mysql: MYSQL,
  server: SERVER,
};

export default config;
