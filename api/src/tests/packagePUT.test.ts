import * as packageService from '../services/package.put.service';
import * as mysqlQuery from '../config/mysql';
import { resetState } from '../services/state.service';

const queryStub: any = jest.spyOn(mysqlQuery, 'Query');

beforeEach(() => {
  jest.resetAllMocks();
});
afterAll(() => {
  resetState();
});
//*************************************************************************************************************/
describe('Voucher validation', () => {
  it('returns null when voucher is valid', () => {
    const result = packageService.validateVoucher('A1A');
    expect(result).toBe(null);
  });
  it('returns warning message when voucher is invalid', async () => {
    const result = await packageService.validateVoucher('b9bb');
    expect(result).toBe('Valid vouchers are in the form: ^[A-Z][0-9][A-Z]$');
  });
});
//*************************************************************************************************************/
describe('scanPackage service', () => {
  it('it calls query stub once', async () => {
    const mockQueryReturn = { affectedRows: 1, changedRows: 1 };
    queryStub.mockResolvedValue(mockQueryReturn);
    await packageService.scanPackage('');
    // sinon.assert.calledOnce(queryStub);
    expect(queryStub).toBeCalledTimes(1);
  });
  it('returns 200 code and message: Voucher scanned successfully', async () => {
    const mockQueryReturn = { affectedRows: 1, changedRows: 1 };
    queryStub.mockResolvedValue(mockQueryReturn);
    const result = await packageService.scanPackage('');

    expect(result.status).toEqual(200);
    expect(result.message).toEqual('Voucher scanned successfully');
  });
  it('returns 400 code and message: No such package found', async () => {
    const mockQueryReturn = { affectedRows: 0, changedRows: 0 };
    queryStub.mockResolvedValue(mockQueryReturn);
    const result = await packageService.scanPackage('');

    expect(result.status).toEqual(400);
    expect(result.message).toEqual('No such package found');
  });
  it('returns 409 code and message: The package is already scanned', async () => {
    const mockQueryReturn = { affectedRows: 1, changedRows: 0 };
    queryStub.mockResolvedValue(mockQueryReturn);
    const result = await packageService.scanPackage('');

    expect(result.status).toEqual(409);
    expect(result.message).toEqual('The package is already scanned');
  });
});
//*************************************************************************************************************/
describe('simulate delivery service', () => {
  it('it calls query stub twice', async () => {
    const mockQueryResult = [{ name: 'Moe', available: 1 }];
    queryStub.mockResolvedValueOnce(mockQueryResult).mockResolvedValueOnce('');

    await packageService.simulateDelivery('');
    expect(queryStub).toBeCalledTimes(2);
  });
  it('returns true', async () => {
    const mockQueryResult = [{ name: 'Moe', available: 1 }];
    queryStub.mockResolvedValueOnce(mockQueryResult).mockResolvedValueOnce('');
    const result = await packageService.simulateDelivery('');

    expect(result).toEqual(true);
  });
  it('returns false', async () => {
    const mockQueryResult = [{ name: 'Moe', available: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult).mockResolvedValueOnce('');
    const result = await packageService.simulateDelivery('');

    expect(result).toEqual(false);
  });
});
//*************************************************************************************************************/
describe('setEnroute service', () => {
  it('it calls Query stub twice and simulateDelivery stub once', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult).mockResolvedValueOnce('');

    //Now that we tested that simulateDelivery works we stub it
    const simulateDeliveryStub = jest.spyOn(packageService, 'simulateDelivery');
    simulateDeliveryStub.mockResolvedValue(true);

    await packageService.setEnRoute('A1A');
    expect(simulateDeliveryStub).toBeCalledTimes(1);
    expect(queryStub).toBeCalledTimes(2);
  });
  it('it returns 200 code and message: Package is en route to delivery', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult).mockResolvedValueOnce('');

    //Now that we tested that simulateDelivery works we stub it
    const simulateDeliveryStub = jest.spyOn(packageService, 'simulateDelivery');
    simulateDeliveryStub.mockResolvedValue(true);

    const result = await packageService.setEnRoute('');
    expect(queryStub).toBeCalledTimes(2);
    expect(result.status).toEqual(200);
    expect(result.message).toEqual('Package is en route to delivery');
  });
  it('it returns 400 code and message: No such package found', async () => {
    const mockQueryResult: Array<unknown> = [];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setEnRoute('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual('No such package found');
  });
  it('it returns 400 code and message: The package is already delivered', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 1 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setEnRoute('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual('The package is already delivered');
  });
  it('it returns 400 code and message" The package is already en route', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 1, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setEnRoute('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual('The package is already en route');
  });
  it('it returns 400 code and message: The given voucher does not correspond to any scanned package', async () => {
    const mockQueryResult = [{ scanned: 0, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setEnRoute('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual(
      'The given voucher does not correspond to any scanned package'
    );
  });
});

describe('setDelivered service', () => {
  it('returns 200 code and message: Package is delivered', async () => {
    const mockFirstQueryResult = [{ scanned: 1, en_route: 1, delivered: 0 }];
    const mockSecondQueryResult = [{ name: 'Moe', available: 0 }];
    queryStub
      .mockResolvedValueOnce(mockFirstQueryResult)
      .mockResolvedValueOnce('')
      .mockResolvedValueOnce(mockSecondQueryResult)
      .mockResolvedValueOnce('');

    const result = await packageService.setDelivered('');
    expect(queryStub).toBeCalledTimes(4);
    expect(result.status).toEqual(200);
    expect(result.message).toEqual('Package is delivered');
  });
  it('it returns 400 code and message:No such package found', async () => {
    const mockQueryResult: Array<unknown> = [];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setDelivered('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual('No such package found');
  });
  it('it returns 409 code and message: The package is already delivered', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 1 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setDelivered('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(409);
    expect(result.message).toEqual('The package is already delivered');
  });
  it('it returns 409 code and message: The given voucher does not correspond to any scanned package', async () => {
    const mockQueryResult = [{ scanned: 0, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setDelivered('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(409);
    expect(result.message).toEqual(
      'The given voucher does not correspond to any scanned package'
    );
  });
  it('it returns 400 code and message: The given voucher has to be enroute first', async () => {
    const mockQueryResult = [{ scanned: 1, en_route: 0, delivered: 0 }];
    queryStub.mockResolvedValueOnce(mockQueryResult);

    const result = await packageService.setDelivered('');
    expect(queryStub).toBeCalledTimes(1);
    expect(result.status).toEqual(400);
    expect(result.message).toEqual('The given voucher has to be enroute first');
  });
});
