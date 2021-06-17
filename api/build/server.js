"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var config_1 = __importDefault(require("./config/config"));
// Initiate http server
app_1.default.listen(config_1.default.server.port, function () {
    console.log("Server is running on " + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
