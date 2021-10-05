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
     * @param {SlashsCommandsOptions[]} slashOptions.options The slash command options.
     * @param {string} slashOptions.defaultPermission The slash command defaultPermission.
     * @param {ApplicationCommandOptionType} slashOptions.options.type The type of the option
     * @param {string} slashsOptions.options.name The name of the option
     * @param {string} slashOptions.options.description The description of the option
     * @param {boolean} slashOptions.options.required Whether the option is required
     * @param {SlashsCommandsOptionsChoices[]} slashOptions.options.choices The choices of the option for the user to pick from
     * @param {string} slashOptions.options.choices.name The name of the choice
     * @param {string|number} slashOptions.options.choices.value The value of the choice
     * @param {SlashsCommandsOptions[]} slashOptions.options.options Additional options if this option is a subcommand (group)
     * @param {boolean} slashOptions.guildOnly Set true or false if you want this command to one guild only.
     */
    constructor(slashOptions) {
        if (!slashOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!slashOptions.description)
            throw new Error(Errrors_1.default.MISSING_SLASH_DESC);
        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions.type || "CHAT_INPUT";
        this.options = slashOptions.options || null;
        this.defaultPermission = slashOptions.defaultPermission || true;
        this.guildOnly = slashOptions.guildOnly || false;
    }
}
exports.default = IgeSlash;
module.exports = IgeSlash;
