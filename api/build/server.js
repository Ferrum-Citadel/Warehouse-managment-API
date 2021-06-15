"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config_1 = __importDefault(require("./config/config"));
// Importing controllers
var packageGetController = __importStar(require("./controllers/packageGet"));
var packageSetController = __importStar(require("./controllers/packagePut"));
var driverController = __importStar(require("./controllers/driver"));
var stateController = __importStar(require("./controllers/state"));
//Create Express server
var app = express_1.default();
// Express config
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.urlencoded({ extended: false }));
/*--------------------------------------------------------------------------- */
//Package GET routes
app.get('/package/all', packageGetController.getPackages);
app.get('/package/scanned', packageGetController.getScanned);
app.get('/package/unscanned', packageGetController.getUnscanned);
app.get('/package/enroute', packageGetController.getEnRoute);
app.get('/package/delivered', packageGetController.getDelivered);
app.get('/status/:voucher', packageGetController.getStatusOne);
app.get('/all', packageGetController.getAll);
app.get('/cluster/:voucher', packageGetController.getCluster);
//Package PUT routes
app.put('/scan/:voucher', packageSetController.validateVoucher, packageSetController.scanPackage);
app.put('/enroute/:voucher', packageSetController.validateVoucher, packageSetController.setEnRoute);
app.put('/delivered/:voucher', packageSetController.validateVoucher, packageSetController.setDelivered);
// Driver routes
app.get('/driver/all', driverController.getAll);
app.get('/driver/packages/:name', driverController.getAssignedPackages);
//State route
app.delete('/reset', stateController.resetState);
// Initiate http server
app.listen(config_1.default.server.port, function () {
    console.log("Server is running on " + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
