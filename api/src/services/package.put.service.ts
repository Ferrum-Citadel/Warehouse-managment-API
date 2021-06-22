import { Query } from '../config/mysql';
import mysql from 'mysql2';

// Middleware for validating given vouchers using RegEx
export const validateVoucher = (voucher: string): string | null => {
  const voucherRexp = new RegExp(`^[A-Z][0-9][A-Z]$`);
  let message: string | null;

  if (voucherRexp.test(voucher) === false) {
    message = 'Valid vouchers are in the form: ^[A-Z][0-9][A-Z]$';
  } else {
    message = null;
  }
  return message;
};

export const scanPackage = async (
  voucher: string
): Promise<Record<string, unknown>> => {
  try {
    const query = mysql.format(
      'UPDATE Packages SET scanned=TRUE WHERE voucher=?',
      [voucher]
    );

    let results = await Query(query);

    results = JSON.parse(JSON.stringify(results));
    const returnValues = {
      status: 200,
      message: 'Voucher scanned successfully',
    };
    if ((results as any).affectedRows === 0) {
      returnValues.status = 400;
      returnValues.message = 'No such package found';
    } else if ((results as any).changedRows === 0) {
      returnValues.status = 409;
      returnValues.message = 'The package is already scanned';
    }
    return returnValues;
  } catch (error) {
    return error;
  }
};

// Servicethat simulates a delivery driver picking up a package depending on its availability
export const simulateDelivery = async (voucher: string): Promise<boolean> => {
  try {
    const query = mysql.format(
      `SELECT d.name, d.available 
        FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id 
        WHERE  p.voucher = ?
        ORDER BY d.name;`,
      [voucher]
    );

    const results = await Query(query);

    const available = (results[0] as any).available;
    const driver = (results[0] as any).name;
    if (available) {
      const query = mysql.format(
        `UPDATE Drivers SET available=FALSE where name=?`,
        [driver]
      );
      await Query(query);

      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const setEnRoute = async (
  voucher: string
): Promise<Record<string, unknown>> => {
  try {
    //Checking if the given package exist in db and  is scanned
    let query = mysql.format(
      'SELECT scanned,en_route,delivered FROM Packages WHERE voucher=?',
      [voucher]
    );
    const results = await Query(query);
    const returnValues = {
      status: 200,
      message: 'Package is en route to delivery',
    };
    // Checking if such package exists first
    if (results.length === 0) {
      returnValues.status = 400;
      returnValues.message = 'No such package found';
      return returnValues;
    }
    const isScanned = results[0].scanned;
    const isEnRoute = results[0].en_route;
    const isDelivered = results[0].delivered;

    // Check current package status
    if (isDelivered) {
      returnValues.status = 400;
      returnValues.message = 'The package is already delivered';
      return returnValues;
    } else if (isEnRoute) {
      returnValues.status = 400;
      returnValues.message = 'The package is already en route';
      return returnValues;
    } else if (!isScanned) {
      returnValues.status = 400;
      returnValues.message =
        'The given voucher does not correspond to any scanned package';
      return returnValues;
    }

    // If the driver is available we simulate delivery
    const available = await simulateDelivery(voucher);
    if (!available) {
      returnValues.status = 409;
      returnValues.message = 'Cannot deliver, driver is unavailable';
    } else {
      //If the package exists and is scanned then we set en route
      query = mysql.format(
        'UPDATE Packages SET en_route=TRUE WHERE voucher=?',
        [voucher]
      );
      await Query(query);
    }
    return returnValues;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const setDelivered = async (
  voucher: string
): Promise<Record<string, unknown>> => {
  try {
    //Checking if the given package exist in db and  is scanned
    let query = mysql.format(
      'SELECT scanned,en_route,delivered FROM Packages WHERE voucher=?',
      [voucher]
    );
    let results = await Query(query);
    const returnValues = {
      status: 200,
      message: 'Package is delivered',
    };

    // Checking if such package exists first
    if (results.length === 0) {
      returnValues.status = 400;
      returnValues.message = 'No such package found';
      return returnValues;
    }

    // And now checking if its scanned and  if its en_route
    const isScanned = results[0].scanned;
    const isEnRoute = results[0].en_route;
    const isDelivered = results[0].delivered;

    //Check current package status
    if (isDelivered) {
      returnValues.status = 409;
      returnValues.message = 'The package is already delivered';
      return returnValues;
    } else if (!isScanned) {
      returnValues.status = 409;
      returnValues.message =
        'The given voucher does not correspond to any scanned package';
      return returnValues;
    } else if (!isEnRoute) {
      returnValues.status = 400;
      returnValues.message = 'The given voucher has to be enroute first';
      return returnValues;
    }
    //If the package exists, is scanned and en_route then we set delivered AND en_route to False
    query = mysql.format(
      'UPDATE Packages SET delivered=TRUE, en_route=FALSE WHERE voucher=?',
      [voucher]
    );

    results = await Query(query);

    // Find assigned drivers name
    query = mysql.format(
      `SELECT d.name, d.available 
          FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id 
          WHERE  p.voucher = ?
          ORDER BY d.name;`,
      [voucher]
    );

    results = await Query(query);

    const driver = (results[0] as any).name;
    // Set driver as available after the package is delivered
    query = mysql.format(`UPDATE Drivers SET available=TRUE WHERE name=?`, [
      driver,
    ]);
    Query(query);

    return returnValues;
  } catch (error) {
    return error;
  }
};
