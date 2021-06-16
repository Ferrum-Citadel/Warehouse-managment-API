import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';
import mysql from 'mysql2';

// Controller for validating given vouchers using RegEx
export const validateVoucher = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const voucherRexp = new RegExp(`^[A-Z][0-9][A-Z]$`);
  if (voucherRexp.test(req.params.voucher) === false) {
    return res
      .status(400)
      .json({ message: 'Valid vouchers are in the form: ^[A-Z][0-9][A-Z]$' });
  }
  return next();
};

// Sets Packages as scanned if they are valid and found
export const scanPackage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = mysql.format(
      'UPDATE Packages SET scanned=TRUE WHERE voucher=?',
      [req.params.voucher]
    );

    const connection = await Connect();
    let results = await Query(connection, query);
    connection.end();
    results = JSON.parse(JSON.stringify(results));

    //If no rows were affected there is no package with such voucher
    if ((results as any).affectedRows === 0) {
      return res.status(400).json({ message: 'No such package found' });
    } else if ((results as any).changedRows === 0) {
      return res
        .status(409)
        .json({ message: 'The package is already scanned' });
    }
    return res.status(200).json({ message: 'Voucher scanned successfully' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// const simulateDelivery = async (
//   connection: mysql.Connection,
//   voucher: string
// ): Promise<boolean> => {
//   try {
//     const query = mysql.format(
//       `SELECT d.name, d.available
//   FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id
//   WHERE  p.voucher = ? AND p.en_route =FALSE AND p.delivered =FALSE
//   ORDER BY d.name;`,
//       [voucher]
//     );

//     const results = await Query(connection, query);

//     const available = (results[0] as any).available;
//     const driver = (results[0] as any).name;

//     if (available) {
//       const query = mysql.format(
//         `UPDATE Drivers SET available=FALSE where name=?`,
//         [driver]
//       );
//       await Query(connection, query);

//       const deliveryTime: number = Math.floor(
//         Math.random() * (10000 - 5000 + 1) + 5000
//       );

//       setTimeout((): void => {
//         const query = mysql.format(
//           `UPDATE Drivers SET available=TRUE where name=?`,
//           [driver]
//         );
//         Query(connection, query);
//         connection.end();
//       }, deliveryTime);
//       return true;
//     }
//     return false;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// Simulates a delivery driver picking up a package depending their availability
const simulateDelivery = async (
  connection: mysql.Connection,
  voucher: string
): Promise<boolean> => {
  try {
    const query = mysql.format(
      `SELECT d.name, d.available 
  FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id 
  WHERE  p.voucher = ?
  ORDER BY d.name;`,
      [voucher]
    );

    const results = await Query(connection, query);

    const available = (results[0] as any).available;
    const driver = (results[0] as any).name;

    if (available) {
      const query = mysql.format(
        `UPDATE Drivers SET available=FALSE where name=?`,
        [driver]
      );
      await Query(connection, query);

      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Sets packages in route to delivery
export const setEnRoute = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const connection = await Connect();
    //Checking if the given package exist in db and  is scanned
    let query = mysql.format(
      'SELECT scanned,en_route,delivered FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    const results = await Query(connection, query);

    // Checking if such package exists first
    if (results.length === 0) {
      return res.status(400).json({ message: 'No such package found' });
    }
    const isScanned = results[0].scanned;
    const isEnRoute = results[0].en_route;
    const isDelivered = results[0].delivered;

    // Check current package status
    if (isDelivered) {
      return res.status(409).json({
        message: 'The package is already delivered',
      });
    } else if (isEnRoute) {
      return res.status(400).json({
        message: 'The package is already en route',
      });
    } else if (!isScanned) {
      return res.status(400).json({
        message: 'The given voucher does not correspond to any scanned package',
      });
    }

    // If the driver is available we simulate delivery
    if (await simulateDelivery(connection, req.params.voucher)) {
      //If the package exists and is scanned then we set en route
      query = mysql.format(
        'UPDATE Packages SET en_route=TRUE WHERE voucher=?',
        [req.params.voucher]
      );
      await Query(connection, query);
      connection.end;

      return res
        .status(200)
        .json({ message: 'Package is en route to delivery' });
    }
    connection.end();

    return res
      .status(409)
      .json({ message: 'Cannot deliver, driver is unavailable' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// Sets packages as delivered
export const setDelivered = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const connection = await Connect();

    //Checking if the given package exist in db and  is scanned
    let query = mysql.format(
      'SELECT scanned, en_route, delivered FROM Packages WHERE voucher=?',
      [req.params.voucher]
    );
    let results = await Query(connection, query);

    // Checking if such package exists first
    if (results.length === 0) {
      return res.status(400).json({ message: 'No such package found' });
    }

    // And now checking if its scanned and  if its en_route
    const isScanned = results[0].scanned;
    const isEnRoute = results[0].en_route;
    const isDelivered = results[0].delivered;

    //Check current package status
    if (isDelivered) {
      return res.status(409).json({
        message: 'The package is already delivered',
      });
    } else if (!isScanned) {
      return res.status(400).json({
        message: 'The given voucher does not correspond to any scanned package',
      });
    } else if (!isEnRoute) {
      return res.status(400).json({
        message: 'The given voucher has to be enroute first',
      });
    }
    //If the package exists, is scanned and en_route then we set delivered AND en_route to False
    query = mysql.format(
      'UPDATE Packages SET delivered=TRUE, en_route=FALSE WHERE voucher=?',
      [req.params.voucher]
    );

    results = await Query(connection, query);

    // Find assigned drivers name
    query = mysql.format(
      `SELECT d.name, d.available 
        FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id 
        WHERE  p.voucher = ?
        ORDER BY d.name;`,
      [req.params.voucher]
    );

    results = await Query(connection, query);

    const driver = (results[0] as any).name;
    // Set driver as available after the package is delivered
    query = mysql.format(`UPDATE Drivers SET available=TRUE WHERE name=?`, [
      driver,
    ]);
    Query(connection, query);
    connection.end();
    return res.status(200).json({ message: 'Package is delivered' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
