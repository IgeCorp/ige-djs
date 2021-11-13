"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IgeClient_1 = __importDefault(require("./IgeClient"));
const IgeCommand_1 = __importDefault(require("./IgeCommand"));
const IgeSlash_1 = __importDefault(require("./IgeSlash"));
const { version } = require("../package.json");
module.exports = {
    IgeClient: IgeClient_1.default,
    IgeCommand: IgeCommand_1.default,
    IgeSlash: IgeSlash_1.default,
    version
};
