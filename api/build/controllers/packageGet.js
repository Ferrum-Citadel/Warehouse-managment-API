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
exports.getCluster = exports.getAll = exports.getStatusOne = exports.getDelivered = exports.getEnRoute = exports.getUnscanned = exports.getScanned = exports.getPackages = void 0;
var mysql_1 = require("../config/mysql");
var mysql2_1 = __importDefault(require("mysql2"));
// Controller that returns all packages from database
var getPackages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                connection.end();
                return [2 /*return*/, res.status(200).json({ results: results })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_1.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPackages = getPackages;
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
                connection.end();
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
                connection.end();
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
                query = 'SELECT * FROM Packages WHERE en_route=TRUE';
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                connection.end();
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
                connection.end();
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
//Middleware that finds a package status by voucher
var getStatusOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, isScanned, isDelivered, IsEnroute, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = mysql2_1.default.format('SELECT scanned, delivered, en_route FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                connection.end();
                // Parse results to constants
                if (results.length !== 0) {
                    isScanned = results[0].scanned;
                    isDelivered = results[0].delivered;
                    IsEnroute = results[0].en_route;
                    // Check package status from db
                    if (isDelivered) {
                        return [2 /*return*/, res.status(200).json({ message: 'Package is delivered' })];
                    }
                    else if (IsEnroute) {
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: 'Package is en route to delivery' })];
                    }
                    else if (isScanned) {
                        return [2 /*return*/, res
                                .status(200)
                                .json({ message: 'Package waiting to be picked up by driver' })];
                    }
                    else {
                        return [2 /*return*/, res.status(200).json({ message: 'Not scanned' })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(200).json({ message: 'No such package' })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                return [2 /*return*/, res.status(500).json({ message: error_6.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStatusOne = getStatusOne;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, queryResults, statusArr_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = 'SELECT p.voucher, p.postcode, p.scanned, p.en_route, p.delivered, c.name, d.name AS driver_name, d.available AS driver_status FROM Packages AS p JOIN Clusters AS c ON p.cluster_id = c.cluster_id JOIN Drivers AS d ON c.cluster_id=d.cluster_id ORDER BY p.voucher';
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
                        var postcode = pckg.postcode;
                        var cluster_name = pckg.name;
                        var voucher = pckg.voucher;
                        var driver = pckg.driver_name;
                        var available = pckg.driver_status;
                        var driver_status;
                        if (available) {
                            driver_status = 'Available';
                        }
                        else {
                            driver_status = 'Unavailable';
                        }
                        var status;
                        // Check package status from db
                        if (isDelivered) {
                            status = 'Package is delivered';
                        }
                        else if (IsEnroute) {
                            status = 'Package is en route to delivery';
                        }
                        else if (isScanned) {
                            status = 'Package Scanned and waiting for delivery';
                        }
                        else {
                            status = 'Not scanned';
                        }
                        statusArr_1.push({
                            voucher: voucher,
                            postcode: postcode,
                            cluster_name: cluster_name,
                            status: status,
                            driver: driver,
                            driver_status: driver_status,
                        });
                    });
                    connection.end();
                    return [2 /*return*/, res.status(200).json({ statusArr: statusArr_1 })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ message: 'No stock' })];
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
exports.getAll = getAll;
// Controller that returns cluster that the package belongs to
var getCluster = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, connection, results, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = mysql2_1.default.format('SELECT scanned, delivered FROM Packages WHERE voucher=?', [req.params.voucher]);
                return [4 /*yield*/, mysql_1.Connect()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, mysql_1.Query(connection, query)];
            case 2:
                results = _a.sent();
                connection.end();
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
