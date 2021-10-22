import { ApplicationCommandOptionType, ApplicationCommandType, Client, Collection } from "discord.js";
import IgeClient from "./src/IgeClient";
import IgeCommand from "./src/IgeCommand";
import IgeSlash from "./src/IgeSlash";

/**
 * @example
 * ```js
 * const { IgeClient } = require("@igecorp/ige-djs");
 * 
 * const client = new IgeCLient("discord bot token", {
 *     replies: true,
 *     prefix: "!",
 *     owner: "client owner id",
 *     testGuild: "test guild id"
 * });
 * ```
 */
export class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix: string;
    owner: string;
    owners?: object;
    testGuild: string;

    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     */

    constructor(token: string, options: ClientOptions);

    /**
     * @example
     * ```js
     * client.params({
     *     commandsDir: "commands",
     *     slashsDir: "slashs",
     *     eventsDir: "events",
     *     mongoUri: "mongodb connection uri"
     * });
     * ```
     * @param {Options} options The client options (commands/slashs/events directory, mongo uri)
     */

    async params(options: Options);
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
     * @param {CommandOptions} commandOptions The command options (name, category, usage, description, ...)
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

    /**
     * @param {SlashOptions} slashOptions The slash command options.
     */
    constructor(slashOptions: SlashOptions);
}

interface ClientOptions {
    /**
     * @description Its a boolean value to set if the bot mention or no a user when it reply a message.
     */
    replies: boolean,
    /**
     * @description The client prefix.
     */
    prefix: string,
    /**
     * @description The client owner user ID.
     */
    owner: string,
    /**
     * @description Other client owners id (don't use if the client have one owner).
     */
    owners?: string[],
    /**
     * @description The client test guild id.
     */
    testGuild: string
}

interface Options {
    /**
     * @description Set default to true, set it to false to use javascript files.
     */
    typescript?: boolean,
    /**
     * @description The client commands directory.
     */
    commandsDir: string,
    /**
     * @description The client slashs commands directory.
     */
    slashsDir: string,
    /**
     * @description The client events directory.
     */
    eventsDir: string,
    /**
     * @description Mongodb connection uri.
     */
    mongoUri?: string
}

interface CommandOptions {
    /**
     * @description The command name
     */
    name: string,
    /**
     * @description The command category.
     */
    category: string,
    /**
     * @description The command description.
     */
    description?: string,
    /**
     * @description The command aliases.
     */
    aliases?: string[],
    /**
     * @description The command usages.
     */
    usage: string[],
    /**
     * @description The command example.
     */
    example?: string[],
    /**
     * @description The command permission.
     */
    permission?: string,
    /**
     * @description Set true or false to define if a bot can use this command.
     */
    botAllowed?: boolean
}

interface SlashOptions {
    /**
     * @description The slash command name.
     */
    name: string,
    /**
     * @description The slash command description.
     */
    description: string,
    /**
     * @description The slash command type (CHAT_IMPUT, USER, MESSAGE).
     */
    type?: ApplicationCommandType,
    /**
     * @description The slash command options (choices, ...)
     */
    options: SlashsCommandsOptions[],
    /**
     * @description The slash command defaultPermission.
     */
    defaultPermission?: boolean,
    /**
     * @description Set true or false if you want this command to one guild only.
     */
    guildOnly?: boolean
}

interface SlashsCommandsOptions {
    /**
     * @description The type of the option
     */
    type: ApplicationCommandOptionType,
    /**
     * @description The name of the option
     */
    name: string,
    /**
     * @description The description of the option
     */
    description: string,
    /**
     * @description Whether the option is required
     */
    required: boolean,
    /**
     * @description The choices of the option for the user to pick from
     */
    choices?: SlashsCommandsOptionsChoices[],
    /**
     * @description Additional options if this option is a subcommand (group)
     */
    options?: SlashsCommandsOptions
}

interface SlashsCommandsOptionsChoices {
    /**
     * @description The name of the choice
     */
    name: string,
    /**
     * @description The value of the choice
     */
    value: string | number
}