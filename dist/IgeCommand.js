"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
/**
 * @example
 * ```js
 * const { IgeCommand } = require("@igecorp/ige-djs");
 *
 * class ping extends IgeCommand {
 *     constructor() {
 *         super({
 *             name: "ping",
 *             category: "utilities",
 *             description: "Get the bot latency",
 *             aliases: ["pingbot", "botping"],
 *             usage: "ping",
 *             example: ["ping", "pingbot", "botping"],
 *             permission: "everyone",
 *             botAllowed: false
 *         })
 *     }
 * }
 * ```
 */
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
     * @param {CommandOptions} commandOptions The command options (name, category, usage, description, ...)
     */
    constructor(commandOptions) {
        if (!commandOptions)
            throw new Error(Errrors_1.default.MISSING_CMD_OPTIONS);
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
