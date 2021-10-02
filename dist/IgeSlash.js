"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
/**
 * @example
 * ```js
 * const { IgeSlash } = require("@igecorp/ige-djs");
 *
 * class ping extends IgeSlash {
 *     constructor() {
 *         super({
 *             name: "ping",
 *             description: "Get the bot latency",
 *             aliases: ["pingbot", "botping"],
 *             usage: "ping",
 *             example: ["ping", "pingbot", "botping"],
 *             permission: "everyone",
 *             guildOnly: false
 *         })
 *     }
 * }
 * ```
 */
class IgeSlash {
    name;
    description;
    aliases;
    usage;
    example;
    permission;
    guildOnly;
    /**
     * @param {SlashOptions} slashOptions The slash command options.
     * @param {string} slashOptions.name The slash command name.
     * @param {string} slashOptions.description The slash command description.
     * @param {string[]} slashOptions.aliases The slash command aliases.
     * @param {string[]} slashOptions.usage The slash command usages.
     * @param {string[]} slashOptions.example The slash command examples.
     * @param {string} slashOptions.permission The slash command permission.
     * @param {boolean} slashOptions.guildOnly Set true or false if you want this command to one guild only.
     */
    constructor(slashOptions) {
        if (!slashOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!slashOptions.usage)
            throw new Error(Errrors_1.default.MISSING_CMD_USAGE);
        if (!slashOptions.description)
            throw new Error(Errrors_1.default.MISSING_SLASH_DESC);
        if (!slashOptions.permission)
            slashOptions.permission = "everyone";
        if (!slashOptions.guildOnly)
            slashOptions.guildOnly = false;
        this.name = slashOptions.name;
        this.description = slashOptions?.description;
        this.aliases = slashOptions?.aliases;
        this.usage = slashOptions.usage;
        this.example = slashOptions?.example;
        this.permission = slashOptions.permission;
        this.guildOnly = slashOptions.guildOnly;
    }
}
exports.default = IgeSlash;
module.exports = IgeSlash;
