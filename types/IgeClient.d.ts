import { Client, Collection } from "discord.js";
import ClientOptions from "./utils/ClientOptions";
import Options from "./utils/Options";
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
 *
 * client.params({
 *     commandsDir: "commands directory",
 *     eventsDir: "events directory",
 *     mongoUri: "mongodb database connection uri"
 * });
 * ```
 */
export default class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix: string;
    owner: string;
    owners: object;
    testGuild: string;
    /**
     * @param {string} token Discord Bot Token
     * @param {ClientOptions?} options Discord Client Options
     */
    constructor(token: string, options?: ClientOptions);
    /**
     * @param {Options} options Bot options (commands dir, events dir, mongodb uri, ...)
     */
    params(options: Options): Promise<void>;
    /**
     * @param {string} cmdDir
     */
    _cmdsHandler(cmdDir: string): Promise<void>;
    /**
     * @param {string} slashDir
     */
    _slashHandler(slashDir: string): Promise<void>;
    /**
     * @param {string} evtDir
     */
    _evtsHandler(evtDir: string): Promise<void>;
    /**
     * @param {string} mongoUri
     */
    _createConnection(mongoUri: string): Promise<void>;
}
