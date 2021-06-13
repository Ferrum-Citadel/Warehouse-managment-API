import { Package } from '../types/package';
import { BasicCluster, Cluster } from '../types/cluster';
import { connection } from '../connect';
import mysql, { OkPacket, RowDataPacket } from 'mysql2/promise';
import { callbackify } from 'util';

// connection.query('SELECT * FROM Packages', (err, result, fields) => {
//   if (err != null) throw err;
//   console.log(result);
//   console.log(fields);
// });

export const FindNotScanned = (callback: Function): void => {
  const queryString = 'SELECT * FROM Packages WHERE scanned=FALSE';

  connection.query(queryString, (err, result) => {
    if (err != null) {
      callback(err);
    }

    const row = (result as RowDataPacket)[0];
    const pkg: Package = {
      voucher: row.voucher,
      postcode: row.postcode,
      cluster: { cluster_id: row.cluster_id },
      scanned: row.scanned,
      delivered: row.delivered,
    };
    callback(null, pkg);
  });
};
