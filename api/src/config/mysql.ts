import mysql, { RowDataPacket } from 'mysql2';
import config from './config';

const params = {
  user: config.mysql.user,
  password: config.mysql.pass,
  host: config.mysql.host,
  database: config.mysql.database,
};

const Connect = async (): Promise<mysql.Connection> =>
  await new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
      if (error !== null) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });

const Query = async (
  connection: mysql.Connection,
  query: string
): Promise<mysql.RowDataPacket[]> =>
  await new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error !== null) {
        console.error(error);
        reject(error);
        return;
      }

      resolve(result as RowDataPacket[]);
    });
  });

export { Connect, Query };
