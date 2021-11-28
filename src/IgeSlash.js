"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
class IgeSlash {
    name;
    description;
    type;
    options;
    defaultPermission;
    guildOnly;
    /**
     * @external ApplicationCommandType
     * @see {@link https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandType}
     */
    /**
     * @external ApplicationCommandOptionType
     * @see {@link https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionType}
     */
    /**
     * Slash command options choices
     * @typedef {Array} SlashsCommandsOptionsChoices
     * @property {string} name The name of the choice
     * @property {string|number} value The value of the choice
     */
    /**
     * Slash command options values
     * @typedef {Array} SlashsCommandsOptions
     * @property {ApplicationCommandOptionType} type The type of the option
     * @property {string} name The name of the option
     * @property {string} description The description of the option
     * @property {boolean} required Whether the option is required
     * @property {SlashsCommandsOptionsChoices[]} [choices=null] The choices of the option for the user to pick from
     * @property {SlashsCommandsOptions} [options=null] Additional options if this option is a subcommand (group)
     */
    /**
     * All slash command options
     * @typedef {Object} SlashOptions
     * @property {string} name The slash command name.
     * @property {string} description The slash command description.
     * @property {ApplicationCommandType} [type="CHAT_IMPUT"] The slash command type (CHAT_IMPUT, USER, MESSAGE).
     * @property {SlashsCommandsOptions[]} [options=null] The slash command options (choices, ...)
     * @property {boolean} [defaultPermission=true] The slash command defaultPermission.
     * @property {boolean} [guildOnly=false] Boolean value if you want this command to one guild only.
     */
    /**
     * @param {SlashOptions} slashOptions The slash command options.
     * @returns {Promise<IgeSlash>}
     */
    constructor(slashOptions) {
        if (!slashOptions)
            throw new Error(Errrors_1.default.MISSING_SLASH_OPTIONS);
        if (!slashOptions.name)
            throw new TypeError(Errrors_1.default.MISSING_SLASH_NAME);
        if (!slashOptions.description)
            throw new TypeError(Errrors_1.default.MISSING_SLASH_DESC);
        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions?.type || "CHAT_INPUT";
        this.options = slashOptions?.options;
        this.defaultPermission = slashOptions?.defaultPermission || true;
        this.guildOnly = slashOptions?.guildOnly || false;
    }
}
exports.default = IgeSlash;
module.exports = IgeSlash;
