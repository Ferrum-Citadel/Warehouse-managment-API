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
exports.setDelivered = exports.setEnRoute = exports.scanPackage = exports.validateVoucher = void 0;
var mysql_1 = require("../config/mysql");
var mysql2_1 = __importDefault(require("mysql2"));
// Controller for validating given vouchers using RegEx
var validateVoucher = function (req, res, next) {
    var voucherRexp = new RegExp("^[A-Z][0-9][A-Z]$");
    if (voucherRexp.test(req.params.voucher) === false) {
        return res
            .status(400)
            .json({ message: 'Valid vouchers are in the form: ^[A-Z][0-9][A-Z]$' });
    }
    return next();
};
exports.validateVoucher = validateVoucher;
// Sets Packages as scanned if they are valid and found
var scanPackage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = mysql2_1.default.format('UPDATE Packages SET scanned=TRUE WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 1:
                results = _a.sent();
                results = JSON.parse(JSON.stringify(results));
                //If no rows were affected there is no package with such voucher
                if (results.affectedRows === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'No such package found' })];
                }
                else if (results.changedRows === 0) {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: 'The package is already scanned' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Voucher scanned successfully' })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_1.message,
                        error: error_1,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.scanPackage = scanPackage;
// Simulates a delivery driver picking up a package depending their availability
var simulateDelivery = function (voucher) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, available, driver, query_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                query = mysql2_1.default.format("SELECT d.name, d.available \n  FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id \n  WHERE  p.voucher = ?\n  ORDER BY d.name;", [voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 1:
                results = _a.sent();
                available = results[0].available;
                driver = results[0].name;
                if (!available) return [3 /*break*/, 3];
                query_1 = mysql2_1.default.format("UPDATE Drivers SET available=FALSE where name=?", [driver]);
                return [4 /*yield*/, mysql_1.Query(query_1)];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3: return [2 /*return*/, false];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, false];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Sets packages in route to delivery
var setEnRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, isScanned, isEnRoute, isDelivered, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                query = mysql2_1.default.format('SELECT scanned,en_route,delivered FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 1:
                results = _a.sent();
                // Checking if such package exists first
                if (results.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'No such package found' })];
                }
                isScanned = results[0].scanned;
                isEnRoute = results[0].en_route;
                isDelivered = results[0].delivered;
                // Check current package status
                if (isDelivered) {
                    return [2 /*return*/, res.status(409).json({
                            message: 'The package is already delivered',
                        })];
                }
                else if (isEnRoute) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'The package is already en route',
                        })];
                }
                else if (!isScanned) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'The given voucher does not correspond to any scanned package',
                        })];
                }
                return [4 /*yield*/, simulateDelivery(req.params.voucher)];
            case 2:
                if (!_a.sent()) return [3 /*break*/, 4];
                //If the package exists and is scanned then we set en route
                query = mysql2_1.default.format('UPDATE Packages SET en_route=TRUE WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 3:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: 'Package is en route to delivery' })];
            case 4: return [2 /*return*/, res
                    .status(409)
                    .json({ message: 'Cannot deliver, driver is unavailable' })];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_2.message,
                        error: error_2,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.setEnRoute = setEnRoute;
// Sets packages as delivered
var setDelivered = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, isScanned, isEnRoute, isDelivered, driver, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                query = mysql2_1.default.format('SELECT scanned, en_route, delivered FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 1:
                results = _a.sent();
                // Checking if such package exists first
                if (results.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'No such package found' })];
                }
                isScanned = results[0].scanned;
                isEnRoute = results[0].en_route;
                isDelivered = results[0].delivered;
                //Check current package status
                if (isDelivered) {
                    return [2 /*return*/, res.status(409).json({
                            message: 'The package is already delivered',
                        })];
                }
                else if (!isScanned) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'The given voucher does not correspond to any scanned package',
                        })];
                }
                else if (!isEnRoute) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'The given voucher has to be enroute first',
                        })];
                }
                //If the package exists, is scanned and en_route then we set delivered AND en_route to False
                query = mysql2_1.default.format('UPDATE Packages SET delivered=TRUE, en_route=FALSE WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 2:
                results = _a.sent();
                // Find assigned drivers name
                query = mysql2_1.default.format("SELECT d.name, d.available \n        FROM Packages p JOIN Drivers d ON p.cluster_id=d.cluster_id \n        WHERE  p.voucher = ?\n        ORDER BY d.name;", [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Query(query)];
            case 3:
                results = _a.sent();
                driver = results[0].name;
                // Set driver as available after the package is delivered
                query = mysql2_1.default.format("UPDATE Drivers SET available=TRUE WHERE name=?", [
                    driver,
                ]);
                mysql_1.Query(query);
                return [2 /*return*/, res.status(200).json({ message: 'Package is delivered' })];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_3.message,
                        error: error_3,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.setDelivered = setDelivered;
