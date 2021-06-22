import * as packageService from '../services/package.get.service';
import * as mysqlQuery from '../config/mysql';
import {
  mockVoucher,
  mockReturn_1,
  mockQueryReturn_1,
  mockCluster,
} from './mockPackageData';
// import sinon from 'sinon';

const queryStub: any = jest.spyOn(mysqlQuery, 'Query');

afterEach(() => {
  jest.resetAllMocks();
});

describe('getPackages service', () => {
  queryStub.mockResolvedValue(mockVoucher);
  it('it runs query stub once', async () => {
    await packageService.getPackages();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns the Query stub hardcoded value', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getPackages();
    expect(result).toEqual(mockVoucher);
  });
});
//*************************************************************************************************************/
describe('getAll service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockQueryReturn_1);
    await packageService.getAll();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockQueryReturn_1);
    const result = await packageService.getAll();
    expect(result).toEqual(mockReturn_1);
  });
});
//*************************************************************************************************************/
describe('getScanned service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getScanned();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getScanned();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no scanned Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getScanned();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getScanned service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getScanned();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getScanned();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no scanned Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getScanned();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getUnScanned service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getUnscanned();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getUnscanned();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no unscanned Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getUnscanned();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getEnRoute service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getEnRoute();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getEnRoute();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no en_route Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getEnRoute();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getEnRoute service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getEnRoute();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getEnRoute();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no en_route Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getEnRoute();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getDelivered service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getDelivered();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data ', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    const result = await packageService.getDelivered();
    expect(result).toEqual(mockVoucher);
  });
  it('returns empty array when there are no delivered Packages', async () => {
    queryStub.mockResolvedValue('');
    const result = await packageService.getDelivered();
    expect(result).toEqual('');
  });
});
//*************************************************************************************************************/
describe('getCluster service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockVoucher);
    await packageService.getCluster('');
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns Cluster data ', async () => {
    queryStub.mockResolvedValue(mockCluster);
    const result = await packageService.getCluster('');
    expect(result).toEqual(mockCluster);
  });
});
//*************************************************************************************************************/
describe('getStatusOne service', () => {
  it('it runs query stub once', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 1 }];
    queryStub.mockResolvedValue(mockQueryResult);
    await packageService.getStatusOne('');
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns scanned status ', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValue(mockQueryResult);
    const result = await packageService.getStatusOne('');
    expect(result).toEqual('Package waiting to be picked up by driver');
  });
  it('returns en route status ', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 1, delivered: 0 }];
    queryStub.mockResolvedValue(mockQueryResult);
    const result = await packageService.getStatusOne('');
    expect(result).toEqual('Package is en route to delivery');
  });
  it('returns delivered status ', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 1 }];
    queryStub.mockResolvedValue(mockQueryResult);
    const result = await packageService.getStatusOne('');
    expect(result).toEqual('Package is delivered');
  });
  it('returns not scanned', async () => {
    const mockQueryResult = [{ scanned: 0, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValue(mockQueryResult);
    const result = await packageService.getStatusOne('');
    expect(result).toEqual('Not scanned');
  });
  it('returns No such package', async () => {
    const mockQueryResult: Array<unknown> = [];
    queryStub.mockResolvedValue(mockQueryResult);
    const result = await packageService.getStatusOne('');
    expect(result).toEqual('No such package');
  });
});
