import { Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';
import mysql from 'mysql2';

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = 'SELECT * FROM Drivers';
    const connection = await Connect();

    const results = await Query(connection, query);
    connection.end();

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Returns the packages that the given driver need to pick up
export const getAssignedPackages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = mysql.format(
      `SELECT voucher
      FROM Packages AS p JOIN Drivers AS d ON p.cluster_id=d.cluster_id 
      WHERE d.name = ? AND p.scanned=TRUE AND p.en_route =FALSE AND p.delivered =FALSE;`,
      [req.params.name]
    );
    const connection = await Connect();

    const results = await Query(connection, query);
    connection.end();
    console.log(results);
    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllAssignedPackages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = mysql.format(
      `SELECT p.voucher
      FROM Packages AS p JOIN Drivers AS d ON p.cluster_id=d.cluster_id 
      WHERE d.name = ? AND p.scanned=TRUE AND p.en_route =FALSE AND p.delivered =FALSE;`,
      [req.params.name]
    );

    const connection = await Connect();

    const results = await Query(connection, query);
    connection.end();

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
