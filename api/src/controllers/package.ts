import { Request, Response, NextFunction } from 'express';
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
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
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
    const query = 'SELECT * FROM Packages WHERE enRoute=TRUE';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
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
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Controller that returns the status of a given package
// export const findStatus = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     //Check if given voucher is valid
//     const voucherRexp = new RegExp(`[A-Z]+[0-9]+[A-Z]`);
//     if (voucherRexp.test(req.params.voucher) === false) {
//       return res
//         .status(400)
//         .json({ error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]' });
//     }
//     // Defining query
//     const query = mysql.format(
//       'SELECT scanned, delivered FROM Packages WHERE voucher=?',
//       [req.params.voucher]
//     );
//     // Awaiting connection to db
//     const connection = await Connect();
//     // Implementing the query
//     const results = await Query(connection, query);
//     // Parse results to constants
//     if (results.length !== 0) {
//       const isScanned = results[0].scanned;
//       const isDelivered = results[0].delivered;
//       const IsEnroute = results[0].en_route;
//       // Check package status from db
//       if (isScanned) {
//         return res.status(200).json({ message: 'Package is in the warehouse' });
//       } else if (isDelivered) {
//         return res.status(200).json({ message: 'Package is delivered' });
//       } else if (IsEnroute) {
//         return res
//           .status(200)
//           .json({ message: 'Package is en route to delivery' });
//       } else {
//         return res
//           .status(200)
//           .json({ message: 'No scanned package matches given voucher' });
//       }
//     } else {
//       return res
//         .status(404)
//         .json({ error: 'No packages match the given voucher' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

//Middleware that finds a package status by voucher
export const statusMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //Check if given voucher is valid
    const voucherRexp = new RegExp(`[A-Z]+[0-9]+[A-Z]`);
    if (voucherRexp.test(req.params.voucher) === false) {
      res.locals.status = 400;
      res.locals.message = {
        error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]',
      };
      return next();
    }
    // Defining query
    const query = mysql.format(
      'SELECT scanned, delivered, en_route FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    // Parse results to constants
    if (results.length !== 0) {
      const isScanned = results[0].scanned;
      const isDelivered = results[0].delivered;
      const IsEnroute = results[0].en_route;
      // Check package status from db
      if (isDelivered) {
        res.locals.status = 200;
        res.locals.message = { message: 'Package is delivered' };
        return next();
      } else if (IsEnroute) {
        res.locals.status = 200;
        res.locals.message = { message: 'Package is en route to delivery' };
        return next();
      } else if (isScanned) {
        res.locals.status = 200;
        res.locals.message = {
          message: 'Package waiting to be picked up by driver',
        };
        return next();
      } else {
        res.locals.status = 200;
        res.locals.message = { message: 'Not scanned' };
        return next();
      }
    } else {
      res.locals.status = 200;
      res.locals.message = {
        message: 'Not in Stock',
      };
      return next();
    }
  } catch (error) {
    console.error(error);
    res.locals.status = 500;
    res.locals.message = {
      error: error.message,
    };
    return next();
  }
};

// Returns status of the package for given voucher
export const getStatusOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(res.locals.status).json(res.locals.message);
};

export const getStatusAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Defining query
    const query =
      'SELECT voucher, postcode, Clusters.name, scanned, en_route,delivered FROM Packages INNER JOIN Clusters ON Packages.cluster_id = Clusters.cluster_id ORDER BY voucher';
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const queryResults = await Query(connection, query);

    //Inline interface definition for returned status results
    const statusArr: {
      voucher: string;
      postcode: string;
      cluster_name: string;
      status: string;
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
        // Check package status from db
        if (isDelivered) {
          const status = 'Package is delivered';
          statusArr.push({ voucher, postcode, cluster_name, status });
        } else if (IsEnroute) {
          const status = 'Package is en route to delivery';
          statusArr.push({ voucher, postcode, cluster_name, status });
        } else if (isScanned) {
          const status = 'Package Scanned and waiting for delivery';
          statusArr.push({ voucher, postcode, cluster_name, status });
        } else {
          const status = 'Not scanned';
          statusArr.push({ voucher, postcode, cluster_name, status });
        }
      });
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
    const voucherRexp = new RegExp(`[A-Z]+[0-9]+[A-Z]`);
    if (voucherRexp.test(req.params.voucher) === false) {
      return res
        .status(400)
        .json({ error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]' });
    }

    const query = mysql.format(
      'SELECT scanned, delivered FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    // Awaiting connection to db
    const connection = await Connect();
    // Implementing the query
    const results = await Query(connection, query);
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const scanPackage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const voucherRexp = new RegExp(`[A-Z]+[0-9]+[A-Z]`);
    if (voucherRexp.test(req.params.voucher) === false) {
      return res
        .status(400)
        .json({ message: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]' });
    }
    const query = mysql.format(
      'UPDATE Packages SET scanned=TRUE WHERE voucher=?',
      [req.params.voucher]
    );

    const connection = await Connect();

    let results = await Query(connection, query);

    results = JSON.parse(JSON.stringify(results));
    //If no rows were affected there is no package with such voucher

    if ((results as any).affectedRows === 0) {
      return res
        .status(400)
        .json({ message: 'No package with given voucher was found' });
    }
    return res.status(200).json({ message: 'Voucher scanned successfully' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
