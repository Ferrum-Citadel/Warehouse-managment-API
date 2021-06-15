import { Request, Response } from 'express';
import { Connect, Query } from '../config/mysql';
import mysql from 'mysql2';

// Controller that returns all packages from database
export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = 'SELECT * FROM Packages';

    const connection = await Connect();

    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controller that returns only  scanned packages
export const getScanned = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE scanned=TRUE';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  unscanned packages
export const getUnscanned = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE scanned=FALSE';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  packages en route
export const getEnRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE en_route=TRUE';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns only  delivered packages
export const getDelivered = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = 'SELECT * FROM Packages WHERE delivered=TRUE';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

//Middleware that finds a package status by voucher
export const getStatusOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = mysql.format(
      'SELECT scanned, delivered, en_route FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);

    connection.end();
    // Parse results to constants
    if (results.length !== 0) {
      const isScanned = results[0].scanned;
      const isDelivered = results[0].delivered;
      const IsEnroute = results[0].en_route;
      // Check package status from db
      if (isDelivered) {
        return res.status(200).json({ message: 'Package is delivered' });
      } else if (IsEnroute) {
        return res
          .status(200)
          .json({ message: 'Package is en route to delivery' });
      } else if (isScanned) {
        return res
          .status(200)
          .json({ message: 'Package waiting to be picked up by driver' });
      } else {
        return res.status(200).json({ message: 'Not scanned' });
      }
    } else {
      return res.status(200).json({ message: 'No such package' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getStatusAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query =
      'SELECT p.voucher, p.postcode, p.scanned, p.en_route, p.delivered, c.name, d.name AS driver_name FROM Packages AS p JOIN Clusters AS c ON p.cluster_id = c.cluster_id JOIN Drivers AS d ON c.cluster_id=d.cluster_id ORDER BY p.voucher';

    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const queryResults = await Query(connection, query);
    console.log(queryResults);
    //Inline interface definition for returned status results
    const statusArr: {
      voucher: string;
      postcode: string;
      cluster_name: string;
      status: string;
      driver: string;
    }[] = [];

    // If the query returned results we check for the sttatus state
    if (queryResults.length !== 0) {
      queryResults.forEach((pckg) => {
        const isScanned = pckg.scanned;
        const isDelivered = pckg.delivered;
        const IsEnroute = pckg.en_route;
        const postcode = pckg.postcode as string;
        const cluster_name = pckg.name as string;
        const voucher = pckg.voucher as string;
        const driver = pckg.driver_name as string;

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
        statusArr.push({ voucher, postcode, cluster_name, status, driver });
      });
      connection.end();
      return res.status(200).json({ statusArr });
    } else {
      return res.status(404).json({ message: 'No stock' });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      err,
    });
  }
};

// Controller that returns cluster that the package belongs to
export const getCluster = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query = mysql.format(
      'SELECT scanned, delivered FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    connection.end();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
