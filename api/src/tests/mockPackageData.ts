export const mockVoucher = {
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

export const mockReturn_1 = [
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
export const mockQueryReturn_1 = [
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

export const mockCluster = {
  result: [
    {
      cluster_id: 1,
      name: 'A',
    },
  ],
};
