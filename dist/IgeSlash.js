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
    name_localizations;
    description_localizations;
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
     * Description in differents locales
     * @typedef {Object} SlashDescriptionLocalizations
     * @property {string} da
     * @property {string} de
     * @property {string} "en-GB"
     * @property {string} "en-US"
     * @property {string} "es-ES"
     * @property {string} fr
     * @property {string} hr
     * @property {string} it
     * @property {string} lt
     * @property {string} hu
     * @property {string} nl
     * @property {string} no
     * @property {string} pl
     * @property {string} "pt-BR"
     * @property {string} ro
     * @property {string} fi
     * @property {string} "sv-SE"
     * @property {string} vi
     * @property {string} tr
     * @property {string} cs
     * @property {string} el
     * @property {string} bg
     * @property {string} ru
     * @property {string} uk
     * @property {string} hi
     * @property {string} th
     * @property {string} "zh-CN"
     * @property {string} ja
     * @property {string} "zh-TW"
     * @property {string} ko
     */
    /**
     * Name in differents locales
     * @typedef {Object} SlashNameLocalizations
     * @property {string} da
     * @property {string} de
     * @property {string} "en-GB"
     * @property {string} "en-US"
     * @property {string} "es-ES"
     * @property {string} fr
     * @property {string} hr
     * @property {string} it
     * @property {string} lt
     * @property {string} hu
     * @property {string} nl
     * @property {string} no
     * @property {string} pl
     * @property {string} "pt-BR"
     * @property {string} ro
     * @property {string} fi
     * @property {string} "sv-SE"
     * @property {string} vi
     * @property {string} tr
     * @property {string} cs
     * @property {string} el
     * @property {string} bg
     * @property {string} ru
     * @property {string} uk
     * @property {string} hi
     * @property {string} th
     * @property {string} "zh-CN"
     * @property {string} ja
     * @property {string} "zh-TW"
     * @property {string} ko
     */
    /**
     * Slash command options values
     * @typedef {Array} SlashsCommandsOptions
     * @property {ApplicationCommandOptionType} type The type of the option
     * @property {string} name The name of the option
     * @property {SlashNameLocalizations} name_localizations Option name in differents locales
     * @property {string} description The description of the option
     * @property {SlashDescriptionLocalizations} description_localizations Option description in differents locales
     * @property {boolean} required Whether the option is required
     * @property {SlashsCommandsOptionsChoices[]} [choices=null] The choices of the option for the user to pick from
     * @property {SlashsCommandsOptions[]} [options=null] Additional options if this option is a subcommand (group)
     */
    /**
     * All slash command options
     * @typedef {Object} SlashOptions
     * @property {string} name The slash command name.
     * @property {SlashNameLocalizations} name_localizations Command name in differents locales
     * @property {string} description The slash command description.
     * @property {SlashDescriptionLocalizations} description_localizations Command description in differents locales
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
         * Name in different locales
         * @type {SlashNameLocalizations}
         */
        this.name_localizations = slashOptions?.name_localizations;
        /**
         * Slash description
         * @type {string}
         */
        this.description = slashOptions.description;
        /**
         * Name in different locales
         * @type {SlashDescriptionLocalizations}
         */
        this.description_localizations = slashOptions?.description_localizations;
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
exports.default = IgeSlash;
