import { Client, Collection } from "discord.js";
import IgeClient from "./src/IgeClient";
import IgeCommand from "./src/IgeCommand";
import IgeSlash from "./src/IgeSlash";

export default class IgeClient extends Client {
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
     * @param {Options} options The client options (commands/slashs/events directory, mongo uri)
     * @param {string} options.commandsDir The client commands directory.
     * @param {string} options.slashsDir The client slashs commands directory.
     * @param {string} options.eventsDir The client events directory.
     * @param {string} options.mongoUri Mongodb connection uri.
     */

    async params(options: Options);
}

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

export class IgeSlash {
    name: string;
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;
    guildOnly: boolean;

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