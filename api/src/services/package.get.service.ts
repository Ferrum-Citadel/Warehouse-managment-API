import { Query } from '../config/mysql';
import mysql, { RowDataPacket } from 'mysql2';

export const getPackages = async (): Promise<RowDataPacket[]> => {
  try {
    const query = 'SELECT * FROM Packages';

    const results = await Query(query);

    return results;
  } catch (error) {
    return error;
  }
};

export const getScanned = async (): Promise<RowDataPacket[]> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE scanned=TRUE';
    // Implementing the query
    const results = await Query(query);
    return results;
  } catch (error) {
    return error;
  }
};

export const getUnscanned = async (): Promise<RowDataPacket[]> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE scanned=FALSE';
    // Implementing the query
    const results = await Query(query);
    return results;
  } catch (error) {
    return error;
  }
};

export const getEnRoute = async (): Promise<RowDataPacket[]> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE en_route=TRUE';
    // Awaiting pool to db
    const results = await Query(query);
    return results;
  } catch (error) {
    return error;
  }
};

export const getDelivered = async (): Promise<RowDataPacket[]> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE delivered=TRUE';
    // Implementing the query
    const results = await Query(query);

    return results;
  } catch (error) {
    return error;
  }
};

export const getStatusOne = async (voucher: string): Promise<string> => {
  try {
    // Defining query
    const query = mysql.format(
      'SELECT scanned, delivered, en_route FROM Packages WHERE voucher=?',
      [voucher]
    );
    // Implementing the query
    const results = await Query(query);
    let message = '';
    // Parse results to constants
    if (results.length !== 0) {
      const isScanned = results[0].scanned;
      const isDelivered = results[0].delivered;
      const IsEnroute = results[0].en_route;
      // Check package status from db
      if (isDelivered) {
        message = 'Package is delivered';
      } else if (IsEnroute) {
        message = 'Package is en route to delivery';
      } else if (isScanned) {
        message = 'Package waiting to be picked up by driver';
      } else {
        message = 'Not scanned';
      }
    } else {
      message = 'No such package';
    }
    return message;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAll = async (): Promise<Array<Record<string, unknown>>> => {
  try {
    // Defining query
    const query =
      'SELECT p.voucher, p.postcode, p.scanned, p.en_route, p.delivered, c.name, d.name AS driver_name, d.available AS driver_status FROM Packages AS p JOIN Clusters AS c ON p.cluster_id = c.cluster_id JOIN Drivers AS d ON c.cluster_id=d.cluster_id ORDER BY p.voucher';

    // Implementing the query
    const queryResults = await Query(query);

    //Inline interface definition for returned status results
    const statusArr: {
      voucher: string;
      postcode: string;
      cluster_name: string;
      status: string;
      driver: string;
      driver_status: string;
    }[] = [];

    // If the query returned results we check for the sttatus state
    if (queryResults.length !== 0) {
      queryResults.forEach((pckg: any) => {
        const isScanned = pckg.scanned;
        const isDelivered = pckg.delivered;
        const IsEnroute = pckg.en_route;
        const postcode = pckg.postcode as string;
        const cluster_name = pckg.name as string;
        const voucher = pckg.voucher as string;
        const driver = pckg.driver_name as string;
        const available = pckg.driver_status as number;

        let driver_status: string;
        if (available) {
          driver_status = 'Available';
        } else {
          driver_status = 'Unavailable';
        }

        let status: string;
        // Check package status from db
        if (isDelivered) {
          status = 'Package is delivered';
        } else if (IsEnroute) {
          status = 'Package is en route to delivery';
        } else if (isScanned) {
          status = 'Package Scanned and waiting for delivery';
        } else {
          status = 'Not scanned';
        }
        // Pushing needed information to a new array that will returned
        statusArr.push({
          voucher,
          postcode,
          cluster_name,
          status,
          driver,
          driver_status,
        });
      });
    }
    return statusArr;
  } catch (error) {
    return error;
  }
};

export const getCluster = async (voucher: string): Promise<Response> => {
  try {
    // Defining query
    const query = mysql.format(
      'SELECT c.cluster_id,c.name FROM Clusters c JOIN Packages p ON c.cluster_id =p.cluster_id WHERE  p.voucher = ?',
      [voucher]
    );
    // Implementing the query
    const results = await Query(query);

    return results;
  } catch (error) {
    return error;
  }
};
