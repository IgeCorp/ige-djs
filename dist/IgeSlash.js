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
 *             type: "MESSAGE",
 *             options: null,
 *             defaultPermission: false
 *             guildOnly: true
 *         })
 *     }
 * }
 * ```
 */
class IgeSlash {
    name;
    description;
    type;
    options;
    defaultPermission;
    guildOnly;
    /**
     * @param {SlashOptions} slashOptions The slash command options.
     * @param {string} slashOptions.name The slash command name.
     * @param {string} slashOptions.description The slash command description.
     * @param {string} slashOptions.type The slash command type (CHAT_IMPUT, USER, MESSAGE).
     * @param {string} slashOptions.options The slash command options.
     * @param {string} slashOptions.defaultPermission The slash command defaultPermission.
     * @param {boolean} slashOptions.guildOnly Set true or false if you want this command to one guild only.
     */
    constructor(slashOptions) {
        if (!slashOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!slashOptions.description)
            throw new Error(Errrors_1.default.MISSING_SLASH_DESC);
        if (!slashOptions.guildOnly)
            slashOptions.guildOnly = false;
        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions.type;
        this.options = slashOptions.options;
        this.defaultPermission = slashOptions.defaultPermission;
        this.guildOnly = slashOptions.guildOnly;
    }
}
exports.default = IgeSlash;
module.exports = IgeSlash;
