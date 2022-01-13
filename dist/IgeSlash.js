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
    category;
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
     * @property {SlashsCommandsOptions[]} [options=null] Additional options if this option is a subcommand (group)
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
     * @property {string} [category=null] The slash command category
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
        /**
         * Slash name
         * @type {string}
         */
        this.name = slashOptions.name;
        /**
         * Slash description
         * @type {string}
         */
        this.description = slashOptions.description;
        /**
         * Slash type
         * @type {ApplicationCommandType}
         */
        this.type = slashOptions?.type || "CHAT_INPUT";
        /**
         * Slash options
         * @type {SlashsCommandsOptions[]}
         */
        this.options = slashOptions?.options;
        /**
         * Slash default permission
         * @type {boolean}
         */
        this.defaultPermission = slashOptions?.defaultPermission || true;
        /**
         * Slash guild only or not
         * @type {boolean}
         */
        this.guildOnly = slashOptions?.guildOnly || false;
        /**
         * Slash command category
         * @type {string}
         */
        this.category = slashOptions?.category;
    }
}
exports.IgeSlash = IgeSlash;
