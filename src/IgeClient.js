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
    /**
     * All command options
     * @typedef {Object} CommandOptions
     * @property {string} name The command name.
     * @property {string} category The command category.
     * @property {string} [description=null] The command description.
     * @property {string[]} [aliases=null] The command aliases.
     * @property {string[]} usage The command usages.
     * @property {string[]} [example=null] The command example.
     * @property {string} [permission=null] The command permission.
     * @property {boolean} [botAllowed=false] Boolean value to define if a bot can use this command.
     */
    /**
     * Command paremeters
     * @param {CommandOptions} commandOptions The command options (name, category, usage, description, ...)
     * @returns {Promise<IgeCommand>}
     */
    constructor(commandOptions) {
        if (!commandOptions)
            throw new Error(Errrors_1.default.MISSING_CMD_OPTIONS);
        if (!commandOptions.name)
            throw new TypeError(Errrors_1.default.MISSING_CMD_NAME);
        if (!commandOptions.category)
            throw new TypeError(Errrors_1.default.MISSING_CMD_CAT);
        if (!commandOptions.usage)
            throw new TypeError(Errrors_1.default.MISSING_CMD_USAGE);
        if (!commandOptions.permission)
            commandOptions.permission = "everyone";
        if (!commandOptions.botAllowed)
            commandOptions.botAllowed = false;
        this.name = commandOptions.name;
        this.category = commandOptions.category;
        this.description = commandOptions?.description;
        this.aliases = commandOptions?.aliases;
        this.usage = commandOptions.usage;
        this.example = commandOptions?.example;
        this.permission = commandOptions.permission;
        this.botAllowed = commandOptions.botAllowed;
    }
}
exports.default = IgeCommand;
module.exports = IgeCommand;
