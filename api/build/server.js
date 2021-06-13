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
var config_1 = __importDefault(require("./config/config"));
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config({ path: './config/.env' });
// Importing controllers
var packageController = __importStar(require("./controllers/package"));
//Create Express server
var app = express_1.default();
// Express config
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.urlencoded({ extended: false }));
//App routes
app.get('/package/all', packageController.getAll);
app.get('/package/scanned', packageController.getScanned);
app.get('/package/unscanned', packageController.getUnscanned);
app.get('/package/enroute', packageController.getEnRoute);
app.get('/package/delivered', packageController.getDelivered);
app.get('/status/:voucher', packageController.statusMiddleware, packageController.getStatusOne);
app.get('/allstatus', packageController.getStatusAll);
app.get('/cluster/:voucher', packageController.getCluster);
app.listen(config_1.default.server.port, function () {
    console.log("Server is running on " + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
