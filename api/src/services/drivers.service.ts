import { Query } from '../config/mysql';
import mysql, { RowDataPacket } from 'mysql2';

export const getAll = async (): Promise<RowDataPacket[]> => {
  try {
    const query = 'SELECT name,cluster_id,available FROM Drivers';

    const results = await Query(query);

    return results;
  } catch (error) {
    return error;
  }
};

export const getAssignedPackages = async (
  driver: string
): Promise<RowDataPacket[]> => {
  try {
    const query = mysql.format(
      `SELECT p.voucher, p.scanned,p.en_route, p.delivered,p.postcode,p.cluster_id
        FROM Packages AS p JOIN Drivers AS d ON p.cluster_id=d.cluster_id 
        WHERE d.name = ? AND p.scanned=TRUE AND p.en_route =FALSE AND p.delivered =FALSE;`,
      [driver]
    );

    const results = await Query(query);

    return results;
  } catch (err) {
    return err;
  }
};

export const getAssignedCluster = async (driver: string): Promise<string> => {
  try {
    const query = mysql.format(
      `SELECT c.name,c.cluster_id FROM Drivers d JOIN Clusters c ON d.cluster_id = c.cluster_id WHERE d.name = ?`,
      [driver]
    );

    const results = await Query(query);

    return results;
  } catch (err) {
    return err;
  }
};
