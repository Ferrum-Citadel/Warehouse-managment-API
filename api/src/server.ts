import express, { urlencoded } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import config from './config/config';

// Importing controllers
import * as packageGetController from './controllers/packageGet';
import * as packageSetController from './controllers/packagePut';
import * as driverController from './controllers/driver';
import * as stateController from './controllers/state';
//Create Express server
const app: express.Application = express();

// Express config
app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: false }));
//-------------------------------------------------------------------------------
//Package GET routes
app.get('/package/all', packageGetController.getPackages);
app.get('/package/scanned', packageGetController.getScanned);
app.get('/package/unscanned', packageGetController.getUnscanned);
app.get('/package/enroute', packageGetController.getEnRoute);
app.get('/package/delivered', packageGetController.getDelivered);
app.get('/status/:voucher', packageGetController.getStatusOne);
app.get('/all', packageGetController.getAll);
app.get('/cluster/:voucher', packageGetController.getCluster);

//Package PUT routes-------------------------------------------------------------
app.put(
  '/scan/:voucher',
  packageSetController.validateVoucher,
  packageSetController.scanPackage
);
app.put(
  '/enroute/:voucher',
  packageSetController.validateVoucher,
  packageSetController.setEnRoute
);
app.put(
  '/delivered/:voucher',
  packageSetController.validateVoucher,
  packageSetController.setDelivered
);

// Driver routes-----------------------------------------------------------------
app.get('/driver/all', driverController.getAll);
app.get('/driver/packages/:name', driverController.getAssignedPackages);

//State route--------------------------------------------------------------------
app.delete('/reset', stateController.resetState);

// Initiate http server
app.listen(config.server.port, (): void => {
  console.log(
    `Server is running on ${config.server.hostname}:${config.server.port}`
  );
});
