import { Query } from '../config/mysql';

export const resetState = async (): Promise<void> => {
  try {
    const query1 =
      'UPDATE Packages SET scanned=FALSE, en_route=FALSE, delivered=FALSE';
    const query2 = 'UPDATE Drivers SET available=TRUE';

    await Query(query1);
    await Query(query2);

    return;
  } catch (error) {
    return error;
  }
};
