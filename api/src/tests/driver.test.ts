import * as driverService from '../services/drivers.service';
import * as mysqlQuery from '../config/mysql';
import {
  mockDrivers,
  mockAssignedPackage,
  mockCluster,
} from './mockDriverData';

const queryStub: any = jest.spyOn(mysqlQuery, 'Query');

afterEach(() => {
  jest.resetAllMocks();
});

describe('getAll service', () => {
  queryStub.mockResolvedValue(mockDrivers);
  it('it runs query stub once', async () => {
    await driverService.getAll();
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns the Query stub hardcoded value', async () => {
    queryStub.mockResolvedValue(mockDrivers);
    const result = await driverService.getAll();
    expect(result).toEqual(mockDrivers);
  });
});

describe('getAssignedPackages service', () => {
  queryStub.mockResolvedValue(mockAssignedPackage);
  it('it runs query stub once', async () => {
    await driverService.getAssignedPackages('');
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns the Query stub hardcoded value', async () => {
    queryStub.mockResolvedValue(mockAssignedPackage);
    const result = await driverService.getAssignedPackages('');
    expect(result).toEqual(mockAssignedPackage);
  });
});

describe('getAssignedCluster service', () => {
  queryStub.mockResolvedValue(mockCluster);
  it('it runs query stub once', async () => {
    await driverService.getAssignedCluster('');
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns the Query stub hardcoded value', async () => {
    queryStub.mockResolvedValue(mockCluster);
    const result = await driverService.getAssignedCluster('');
    expect(result).toEqual(mockCluster);
  });
});
