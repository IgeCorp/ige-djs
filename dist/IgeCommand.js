"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
class IgeCommand {
    name;
    category;
    description;
    aliases;
    usage;
    example;
    permission;
    botAllowed;
    slash;
    /**
     * @param {CommandOptions} commandOptions
     */
    constructor(commandOptions) {
        if (!commandOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!commandOptions.category)
            throw new Error(Errrors_1.default.MISSING_CMD_CAT);
        if (!commandOptions.usage)
            throw new Error(Errrors_1.default.MISSING_CMD_USAGE);
        if (!commandOptions.permission)
            commandOptions.permission = "everyone";
        if (!commandOptions.botAllowed)
            commandOptions.botAllowed = false;
        if (!commandOptions.slash)
            commandOptions.slash = true;
        this.name = commandOptions.name;
        this.category = commandOptions.category;
        this.description = commandOptions?.description;
        this.aliases = commandOptions?.aliases;
        this.usage = commandOptions.usage;
        this.example = commandOptions?.example;
        this.permission = commandOptions.permission;
        this.botAllowed = commandOptions.botAllowed;
        this.slash = commandOptions.slash;
    }
}
exports.default = IgeCommand;
module.exports = IgeCommand;
