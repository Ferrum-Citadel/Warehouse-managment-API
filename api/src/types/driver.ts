import { Cluster } from './cluster';

export interface Driver {
  id: number;
  name: string;
  cluster: Cluster;
  available: boolean;
}
