"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
console.log(process.env.DB_HOST);
// create the connection to database
var connection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'skroutzdb',
});
exports.connection = connection;
connection.connect(function (err) {
    if (err != null) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
