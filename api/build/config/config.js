"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var MYSQL_HOST = process.env.DB_HOST;
var MYSQL_DATABASE = process.env.DB_NAME;
var MYSQL_USER = process.env.DB_USER;
var MYSQL_PASS = process.env.DB_PWD;
var MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS,
};
var SERVER_HOSTNAME = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost';
var SERVER_PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5001;
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
var config = {
    mysql: MYSQL,
    server: SERVER,
};
exports.default = config;
