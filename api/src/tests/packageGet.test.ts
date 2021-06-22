import * as packageService from '../services/package.get.service';
import * as mysqlQuery from '../config/mysql';
// import sinon from 'sinon';

const queryStub: any = jest.spyOn(mysqlQuery, 'Query');

afterEach(() => {
  jest.resetAllMocks();
});

const mockVoucher = {
  results: [
    {
      voucher: 'A1A',
      postcode: '10041',
      cluster_id: 1,
      scanned: 0,
      delivered: 0,
      en_route: 0,
    },
  ],
};

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

const mockReturn = [
  {
    cluster_name: 'A',
    driver: 'Moe',
    driver_status: 'Available',
    postcode: '10041',
    status: 'Not scanned',
    voucher: 'A1A',
  },
  {
    cluster_name: 'B',
    driver: 'Larry',
    driver_status: 'Available',
    postcode: '11332',
    status: 'Not scanned',
    voucher: 'B2B',
  },
];
const mockQueryReturn = [
  {
    voucher: 'A1A',
    postcode: '10041',
    scanned: 0,
    en_route: 0,
    delivered: 0,
    name: 'A',
    driver_name: 'Moe',
    driver_status: 1,
  },
  {
    voucher: 'B2B',
    postcode: '11332',
    scanned: 0,
    en_route: 0,
    delivered: 0,
    name: 'B',
    driver_name: 'Larry',
    driver_status: 1,
  },
];

describe('getAll service', () => {
  it('it runs query stub once', async () => {
    queryStub.mockResolvedValue(mockQueryReturn);
    await packageService.getAll();
    // sinon.assert.calledOnce(queryStub);
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns array with data used in front-end data table', async () => {
    queryStub.mockResolvedValue(mockQueryReturn);
    const result = await packageService.getAll();
    expect(result).toEqual(mockReturn);
  });
});
