import { ApplicationCommandOptionData, ApplicationCommandType, Client, Collection } from "discord.js";
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
    owners!: object;
    testGuild: string;

    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     * @param {boolean} options.replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     * @param {string} options.prefix The client prefix.
     * @param {string} options.owner The client owner user ID.
     * @param {string[]} options.owners Other client owners id (don't use if the client have one owner).
     * @param {string} options.testGuild The client test guild id.
     */

    constructor(token: string, options?: ClientOptions);

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
     * @param {string} options.commandsDir The client commands directory.
     * @param {string} options.slashsDir The client slashs commands directory.
     * @param {string} options.eventsDir The client events directory.
     * @param {string} options.mongoUri Mongodb connection uri.
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
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;
    botAllowed: boolean;

    /**
     * @param {CommandOptions} commandOptions The command options (name, category, usage, description, ...)
     * @param {string} commandOptions.name The command name.
     * @param {string} commandOptions.category The command category.
     * @param {string} commandOptions.description The command description.
     * @param {string[]} commandOptions.aliases The command aliases.
     * @param {string[]} commandOptions.usage The command usages.
     * @param {string[]} commandOptions.example The command examples.
     * @param {string} commandOptions.permission The command permission.
     * @param {boolean} commandOptions.botAllowed Set true or false to define if a bot can use this command.
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
    type: ApplicationCommandType;
    options: ApplicationCommandOptionData;
    defaultPermission: boolean;
    guildOnly: boolean;

    /**
     * @param {SlashOptions} slashOptions The slash command options.
     * @param {string} slashOptions.name The slash command name.
     * @param {string} slashOptions.description The slash command description.
     * @param {string} slashOptions.type The slash command type (CHAT_IMPUT, USER, MESSAGE).
     * @param {string} slashOptions.options The slash command options.
     * @param {string} slashOptions.defaultPermission The slash command defaultPermission.
     * @param {boolean} slashOptions.guildOnly Set true or false if you want this command to one guild only.
     */
    constructor(slashOptions: SlashOptions);
}

interface ClientOptions {
    replies: boolean,
    prefix: string,
    owner: string,
    owners: string[],
    testGuild: string
}

interface Options {
    commandsDir: string,
    slashsDir: string,
    eventsDir: string,
    mongoUri: string
}

interface CommandOptions {
    name: string,
    category: string,
    description: string,
    aliases: string[],
    usage: string[],
    example: string[],
    permission: string,
    botAllowed: boolean
}

interface SlashOptions {
    name: string,
    description: string,
    aliases: string[],
    usage: string[],
    example: string[],
    permission: string,
    guildOnly: boolean
}