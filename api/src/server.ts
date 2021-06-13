import express, { urlencoded } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import config from './config/config';

// Importing controllers
import * as packageController from './controllers/package';

//Create Express server
const app: express.Application = express();

// Express config
app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: false }));

//App routes
app.get('/package/all', packageController.getAll);
app.get('/package/scanned', packageController.getScanned);
app.get('/package/unscanned', packageController.getUnscanned);
app.get('/package/enroute', packageController.getEnRoute);
app.get('/package/delivered', packageController.getDelivered);
app.get(
  '/status/:voucher',
  packageController.statusMiddleware,
  packageController.getStatusOne
);
app.get('/allstatus', packageController.getStatusAll);
app.get('/cluster/:voucher', packageController.getCluster);

app.listen(config.server.port, (): void => {
  console.log(
    `Server is running on ${config.server.hostname}:${config.server.port}`
  );
});
