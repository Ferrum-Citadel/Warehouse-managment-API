import { Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';

export const resetState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query1 =
      'UPDATE Packages SET scanned=FALSE, en_route=FALSE, delivered=FALSE';
    const query2 = 'UPDATE Drivers SET available=TRUE';
    const connection = await Connect();

    await Query(connection, query1);
    await Query(connection, query2);

    connection.end();

    return res.status(200).json({ message: 'Project state is reset' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
