"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IgeClient_1 = require("./IgeClient");
const IgeCommand_1 = require("./IgeCommand");
const { version } = require("../package.json");
module.exports = {
    IgeClient: IgeClient_1.IgeClient,
    IgeCommand: IgeCommand_1.IgeCommand,
    version
};
