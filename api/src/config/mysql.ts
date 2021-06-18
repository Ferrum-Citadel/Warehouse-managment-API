import mysql, { RowDataPacket } from 'mysql2';
import { createPool, Pool } from 'mysql2';
import config from './config';

//Connection parameters
const params = {
  user: config.mysql.user,
  password: config.mysql.pass,
  host: config.mysql.host,
  database: config.mysql.database,
  connectionLimit: 10,
};

//Creating Connection pool
const pool: Pool = createPool(params);

// Function that wraps query execution in a Promise
const Query = async (query: string): Promise<mysql.RowDataPacket[]> =>
  await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result as RowDataPacket[]);
        connection.release();
      });
    });
  });

export { Query };
