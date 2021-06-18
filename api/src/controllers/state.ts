import { Request, Response } from 'express';
import { Query } from '../config/mysql';

//Controller that resets the database state
export const resetState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query1 =
      'UPDATE Packages SET scanned=FALSE, en_route=FALSE, delivered=FALSE';
    const query2 = 'UPDATE Drivers SET available=TRUE';

    await Query(query1);
    await Query(query2);

    return res.status(200).json({ message: 'Project state is reset' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
