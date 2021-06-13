"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNotScanned = void 0;
var connect_1 = require("../connect");
// connection.query('SELECT * FROM Packages', (err, result, fields) => {
//   if (err != null) throw err;
//   console.log(result);
//   console.log(fields);
// });
var FindNotScanned = function (callback) {
    var queryString = 'SELECT * FROM Packages WHERE scanned=FALSE';
    connect_1.connection.query(queryString, function (err, result) {
        if (err != null) {
            callback(err);
        }
        var row = result[0];
        var pkg = {
            voucher: row.voucher,
            postcode: row.postcode,
            cluster: { cluster_id: row.cluster_id },
            scanned: row.scanned,
            delivered: row.delivered,
        };
        callback(null, pkg);
    });
};
exports.FindNotScanned = FindNotScanned;
