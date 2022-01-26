import { ApplicationCommandOptionType, ApplicationCommandType, Client, Collection } from "discord.js";
import IgeClient from "./src/IgeClient";
import IgeCommand from "./src/IgeCommand";
import IgeSlash from "./src/IgeSlash";

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/stable/class/Client}
 */

/**
 * @extends {Client}
 * @example
 * ```js
 * const { IgeClient } = require("@igecorp/ige-djs");
 * 
 * const client = new IgeCLient("discord bot token", {
 *     replies: true,
 *     owner: "client owner id",
 *     testGuild: "test guild id"
 * });
 * ```
 */
export class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix?: string;
    owner: string | string[];
    testGuild: string;

    /**
     * All IgeClient options
     * @typedef {Object} ClientOptions
     * @property {boolean} replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     * @property {string} [prefix=null] The client prefix.
     * @property {string|string[]} owner The client owner user ID.
     * @property {string} testGuild The client test guild id.
     */

    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     * @returns {Promise<string>} Token of the account used
     */

    constructor(token: string, options: ClientOptions);

     /**
     * All parameters for IgeClient handler
     * @typedef {Object} Options
     * @property {boolean} [typescript=false] Set default to true, set it to false to use javascript files.
     * @property {string} [commandsDir=null] The client commands directory.
     * @property {string} slashsDir The client slashs commands directory.
     * @property {string} eventsDir The client events directory.
     * @property {string} [mongoUri=null] Mongodb connection uri.
     * @property {boolean} [cmdsInFolders=false] Set this to true if you want to use basic commands and slashs command in folders.
     */

    /**
     * IgeClient Options for handler and mongodb
     * @param {Options} options The client options (commands/slashs/events directory, mongo uri)
     * @returns {Options}
     * @example
     * client.params({
     *     slashsDir: "slashs",
     *     eventsDir: "events",
     *     mongoUri: "mongodb connection uri"
     * });
     */

    async params(options: Options);

    /**
     * Slashs commands post method
     * @param {any} slashsArray The slashs commands array (use <IgeClient>.slashs to get them)
     */
    async postSlashs(slashsArray: any);
}

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
export class IgeCommand {
    name: string;
    category: string;
    description?: string;
    aliases?: string[];
    usage: string[];
    example?: string[];
    permission?: string;
    botAllowed?: boolean;

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
     constructor(commandOptions: CommandOptions);
}

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
export class IgeSlash {
    name: string;
    description: string;
    type?: ApplicationCommandType;
    options?: SlashsCommandsOptions[];
    defaultPermission?: boolean;
    guildOnly?: boolean;
    category?: string;

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
     * @property {string} [category=null] The slash command category
     */

    /**
     * @param {SlashOptions} slashOptions The slash command options.
     * @returns {Promise<IgeSlash>}
     */
    constructor(slashOptions: SlashOptions);
}

interface ClientOptions {
    /**
     * @param {boolean} replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     */
     replies: boolean,
     /**
      * @param {string} prefix The client prefix.
      */
     prefix: string,
     /**
      * @param {string|string[]} owner The client owner user ID.
      */
     owner: string | string[],
     /**
      * @param {string} testGuild The client test guild id.
      */
     testGuild: string
}

interface Options {
    /**
     * @param {string} typescript Set default to false, set it to true to use typescript files.
     */
     typescript?: boolean,
     /**
      * @param {string} commandsDir The client commands directory.
      */
     commandsDir?: string,
     /**
      * @param {string} slashsDir The client slashs commands directory.
      */
     slashsDir: string,
     /**
      * @param {string} eventsDir The client events directory.
      */
     eventsDir: string,
     /**
      * @param {string} mongoUri Mongodb connection uri.
      */
     mongoUri?: string
     /**
      * @param {boolean} cmdsInFolders Set this to true if you want to use basic commands and slashs command in folders.
      */
     cmdsInFolders?: boolean
}

interface CommandOptions {
    /**
     * @param {string} name The command name
     */
     name: string,
     /**
      * @param {string} category The command category.
      */
     category: string,
     /**
      * @param {string} description The command description.
      */
     description?: string,
     /**
      * @param {string[]} aliases The command aliases.
      */
     aliases?: string[],
     /**
      * @param {string[]} usage The command usages.
      */
     usage: string[],
     /**
      * @param {string[]} example The command example.
      */
     example?: string[],
     /**
      * @param {string} permission The command permission.
      */
     permission?: string,
     /**
      * @param {boolean} botAllowed Set true or false to define if a bot can use this command.
      */
     botAllowed?: boolean
}

interface SlashOptions {
    /**
     * @param {string} name The slash command name.
     */
     name: string,
     /**
      * @param {string} description The slash command description.
      */
     description: string,
     /**
      * @param {ApplicationCommandType} type The slash command type (CHAT_IMPUT, USER, MESSAGE).
      */
     type?: ApplicationCommandType,
     /**
      * @param {SlashsCommandsOptions[]} options The slash command options (choices, ...)
      */
     options?: SlashsCommandsOptions[],
     /**
      * @param {boolean} defaultPermission The slash command defaultPermission.
      */
     defaultPermission?: boolean,
     /**
      * @param {boolean} guildOnly Set true or false if you want this command to one guild only.
      */
     guildOnly?: boolean,
     /**
      * @param {string} category The slash command category
      */
     category?: string
}

interface SlashsCommandsOptions {
    /**
     * @param {ApplicationCommandOptionType} type The type of the option
     */
     type: ApplicationCommandOptionType,
     /**
      * @param {string} name The name of the option
      */
     name: string,
     /**
      * @param {string} description The description of the option
      */
     description: string,
     /**
      * @param {boolean} required Whether the option is required
      */
     required: boolean,
     /**
      * @param {SlashsCommandsOptionsChoices[]} choices The choices of the option for the user to pick from
      */
     choices?: SlashsCommandsOptionsChoices[],
     /**
      * @param {options} options Additional options if this option is a subcommand (group)
      */
     options?: SlashsCommandsOptions
}

interface SlashsCommandsOptionsChoices {
    /**
     * @param {string} name The name of the choice
     */
     name: string,
     /**
      * @param {string|number} value The value of the choice
      */
     value: string | number
}