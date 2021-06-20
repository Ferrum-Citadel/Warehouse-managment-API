import { getPackages } from '../services/package.get.service';
import * as mysqlQuery from '../config/mysql';
// import sinon from 'sinon';

const queryStub: any = jest.spyOn(mysqlQuery, 'Query').mockResolvedValue({
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
});

// const queryStub = sinon.stub(mysqlQuery, 'Query').resolves({
//   results: [
//     {
//       voucher: 'A1A',
//       postcode: '10041',
//       cluster_id: 1,
//       scanned: 0,
//       delivered: 0,
//       en_route: 0,
//     },
//   ],
// });

describe('controller for Getting packages', () => {
  it('it runs query stub once', async () => {
    await getPackages();
    // sinon.assert.calledOnce(queryStub);
    expect(queryStub).toHaveBeenCalled();
  });
  it('returns the queryStub hardcoded value', async () => {
    const result = await getPackages();
    expect(result).toEqual({
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
    });
  });
});
