import { BasicCluster } from './cluster';

export interface Package {
  voucher: string;
  postcode: string;
  cluster: BasicCluster;
  scanned: boolean;
  delivered: boolean;
}
