"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCluster = exports.getStatusAll = exports.getStatusOne = exports.statusMiddleware = exports.getDelivered = exports.getEnRoute = exports.getUnscanned = exports.getScanned = exports.getAll = void 0;
var mysql_1 = require("../config/mysql");
var mysql2_1 = __importDefault(require("mysql2"));
// Controller that returns all packages from database
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT * FROM Packages';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_1.message,
                        error: error_1,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
// Controller that returns only  scanned packages
var getScanned = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT * FROM Packages WHERE scanned=TRUE';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_2.message,
                        error: error_2,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getScanned = getScanned;
// Controller that returns only  unscanned packages
var getUnscanned = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT * FROM Packages WHERE scanned=FALSE';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_3.message,
                        error: error_3,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUnscanned = getUnscanned;
// Controller that returns only  packages en route
var getEnRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT * FROM Packages WHERE enRoute=TRUE';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_4.message,
                        error: error_4,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getEnRoute = getEnRoute;
// Controller that returns only  delivered packages
var getDelivered = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT * FROM Packages WHERE delivered=TRUE';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_5.message,
                        error: error_5,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDelivered = getDelivered;
// Controller that returns the status of a given package
// export const findStatus = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     //Check if given voucher is valid
//     const voucherRexp = new RegExp(`[A-Z]+[0-9]+[A-Z]`);
//     if (voucherRexp.test(req.params.voucher) === false) {
//       return res
//         .status(400)
//         .json({ error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]' });
//     }
//     // Defining query
//     const query = mysql.format(
//       'SELECT scanned, delivered FROM Packages WHERE voucher=?',
//       [req.params.voucher]
//     );
//     // Awaiting connection to db
//     const connection = await Connect();
//     // Implementing the query
//     const results = await Query(connection, query);
//     // Parse results to constants
//     if (results.length !== 0) {
//       const isScanned = results[0].scanned;
//       const isDelivered = results[0].delivered;
//       const IsEnroute = results[0].en_route;
//       // Check package status from db
//       if (isScanned) {
//         return res.status(200).json({ message: 'Package is in the warehouse' });
//       } else if (isDelivered) {
//         return res.status(200).json({ message: 'Package is delivered' });
//       } else if (IsEnroute) {
//         return res
//           .status(200)
//           .json({ message: 'Package is en route to delivery' });
//       } else {
//         return res
//           .status(200)
//           .json({ message: 'No scanned package matches given voucher' });
//       }
//     } else {
//       return res
//         .status(404)
//         .json({ error: 'No packages match the given voucher' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };
//Middleware that finds a package status by voucher
var statusMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var voucherRexp, query, connection, results, isScanned, isDelivered, IsEnroute, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                voucherRexp = new RegExp("[A-Z]+[0-9]+[A-Z]");
                if (voucherRexp.test(req.params.voucher) === false) {
                    res.locals.status = 400;
                    res.locals.message = {
                        error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]',
                    };
                    return [2 /*return*/, next()];
                }
                query = mysql2_1.default.format('SELECT scanned, delivered, en_route FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                // Parse results to constants
                if (results.length !== 0) {
                    isScanned = results[0].scanned;
                    isDelivered = results[0].delivered;
                    IsEnroute = results[0].en_route;
                    // Check package status from db
                    if (isScanned) {
                        res.locals.status = 200;
                        res.locals.message = {
                            message: 'Package waiting to be picked up by driver',
                        };
                        return [2 /*return*/, next()];
                    }
                    else if (isDelivered) {
                        res.locals.status = 200;
                        res.locals.message = { message: 'Package is delivered' };
                        return [2 /*return*/, next()];
                    }
                    else if (IsEnroute) {
                        res.locals.status = 200;
                        res.locals.message = { message: 'Package is en route to delivery' };
                        return [2 /*return*/, next()];
                    }
                    else {
                        res.locals.status = 200;
                        res.locals.message = { message: 'Not scanned' };
                        return [2 /*return*/, next()];
                    }
                }
                else {
                    res.locals.status = 200;
                    res.locals.message = {
                        message: 'Not in Stock',
                    };
                    return [2 /*return*/, next()];
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.locals.status = 500;
                res.locals.message = {
                    error: error_6.message,
                };
                return [2 /*return*/, next()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.statusMiddleware = statusMiddleware;
// Returns status of the package for given voucher
var getStatusOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(res.locals.status).json(res.locals.message)];
    });
}); };
exports.getStatusOne = getStatusOne;
var getStatusAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, queryResults, statusArr_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT voucher, scanned, en_route,delivered FROM Packages ';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                queryResults = _a.sent();
                statusArr_1 = [];
                // If the query returned results we check for the sttatus state
                if (queryResults.length !== 0) {
                    queryResults.forEach(function (pckg) {
                        var isScanned = pckg.scanned;
                        var isDelivered = pckg.delivered;
                        var IsEnroute = pckg.en_route;
                        var voucher = pckg.voucher;
                        // Check package status from db
                        if (isScanned) {
                            var status_1 = 'Package waiting to be picked up by driver';
                            statusArr_1.push({ voucher: voucher, status: status_1 });
                        }
                        else if (isDelivered) {
                            var status_2 = 'Package is delivered';
                            statusArr_1.push({ voucher: voucher, status: status_2 });
                        }
                        else if (IsEnroute) {
                            var status_3 = 'Package is en route to delivery';
                            statusArr_1.push({ voucher: voucher, status: status_3 });
                        }
                        else {
                            var status_4 = 'Not scanned';
                            statusArr_1.push({ voucher: voucher, status: status_4 });
                        }
                    });
                    return [2 /*return*/, res.status(200).json({ statusArr: statusArr_1 })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ error: 'Not in Stock' })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: err_1.message,
                        err: err_1,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStatusAll = getStatusAll;
// Controller that returns cluster that the package belongs to
var getCluster = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var voucherRexp, query, connection, results, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                voucherRexp = new RegExp("[A-Z]+[0-9]+[A-Z]");
                if (voucherRexp.test(req.params.voucher) === false) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: 'Valid vouchers are in the form: [A-Z]+[0-9]+[A-Z]' })];
                }
                query = mysql2_1.default.format('SELECT scanned, delivered FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_7 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_7.message,
                        error: error_7,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCluster = getCluster;
