import { Client, Collection } from "discord.js";
import Errors from "./utils/Errrors";
import ClientOptions from "./utils/ClientOptions";
import Options from "./utils/Options";
import Intents from "./utils/Intents";
import { readdir } from "fs";
import { blue, green, red } from "colors";
import { connect } from "mongoose";

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/stable/class/Client}
 */

/**
 * @extends {Client}
 */
export default class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix: string;
    owner: string | string[];
    testGuild: string;

    /**
     * All IgeClient options
     * @typedef {Object} ClientOptions
     * @property {boolean} replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     * @property {string} prefix The client prefix.
     * @property {string|string[]} owner The client owner user ID.
     * @property {string} testGuild The client test guild id.
     */

    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     * @returns {Promise<string>} Token of the account used
     */
    constructor(token: string, options: ClientOptions) {
        if (!token) throw new TypeError(Errors.MISSING_TOKEN);
        if (!options) throw new TypeError(Errors.MISSING_CLIENT_OPTIONS);
        if (!options.prefix) throw new TypeError(Errors.MISSING_PREFIX);
        if (!options.owner) throw new TypeError(Errors.MISSING_OWNER_ID);
        if (!options.testGuild) throw new TypeError(Errors.MISSING_GUILD_ID);

        super({
            partials: ["USER","CHANNEL","GUILD_MEMBER","MESSAGE","REACTION"],
            allowedMentions: {
                repliedUser: options.replies || false
            },
            failIfNotExists: false,
            intents: Intents
        });
        /**
         * The client commands Map
         * @type {Collection}
         */
        this.commands = new Collection();
        /**
         * The client slashs commands Map
         * @type {Collection}
         */
        this.slashs = new Collection();

        /**
         * Client prefix
         * @type {string}
         */
        this.prefix = options.prefix;
        /**
         * Client owner(s)
         * @type {string|string[]}
         */
        this.owner = options.owner;
        /**
         * Client test guild id
         * @type {string}
         */
        this.testGuild = options.testGuild;

        this.login(token);
    }

    /**
     * All parameters for IgeClient handler
     * @typedef {Object} Options
     * @property {string} [typescript=false] Set default to true, set it to false to use javascript files.
     * @property {string} [commandsDir=null] The client commands directory.
     * @property {string} slashsDir The client slashs commands directory.
     * @property {string} eventsDir The client events directory.
     * @property {string} [mongoUri=null] Mongodb connection uri.
     */

    /**
     * IgeClient Options for handler and mongodb
     * @param {Options} options The client options (commands/slashs/events directory, mongo uri)
     * @returns {Options}
     * @example
     * client.params({
     *     commandsDir: "commands",
     *     slashsDir: "slashs",
     *     eventsDir: "events",
     *     mongoUri: "mongodb connection uri"
     * });
     */
    async params(options: Options) {
        if (!options) throw new Error(Errors.MISSING_OPTIONS)
        let useTs;
        if (!options.slashsDir) throw new TypeError(Errors.MISSING_SLASH_DIR);
        if (!options.eventsDir) throw new TypeError(Errors.MISSING_EVT_DIR);
        if (!options?.mongoUri) console.warn(red(`WARNING: `) + Errors.MISSING_MONGO_URI);
        (options?.typescript === true) ? useTs = true : useTs = false;

        if (options.commandsDir) this._cmdsHandler(`${process.cwd()}/${options.commandsDir}`, useTs);
        this._slashHandler(`${process.cwd()}/${options.slashsDir}`, useTs);
        this._evtsHandler(`${process.cwd()}/${options.eventsDir}`, useTs);
        if (options.mongoUri) this._createConnection(options.mongoUri);
    }
    
    /**
     * The client commands handler
     * @param {string} cmdDir 
     * @param {boolean} useTs
     * @private
     */
    async _cmdsHandler(cmdDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(cmdDir, (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach(file => {
                if (!file.endsWith(fileType)) return size = size-1;
                
                try {
                    const command = require(`${cmdDir}/${file}`);
                    this.commands.set(command.name, command);
                    count = count+1;
                } catch(err) {
                    const cmdName = file.split(".")[0];
                    console.log(`${red("Error")} | Failed to load ${blue(cmdName)} command.\n${err}`);
                }
            });
            console.log(`${green("Success")} | Loaded ${count}/${size} commands.`);
        });
    }

    /**
     * The client slash commands handler
     * @param {string} slashDir 
     * @param {boolean} useTs
     * @private
     */
    async _slashHandler(slashDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(slashDir, async (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach(async file => {
                if (!file.endsWith(fileType)) return size = size-1;;
                try {
                    const command = require(`${slashDir}/${file}`);
                    this.slashs.set(command.name, command);
                    count = count+1;
                } catch(err) {
                    const slashName = file.split(".")[0];
                    console.log(`${red("Error")} | Failed to load ${blue(slashName)} slash command.\n${err}`);
                }
            });

            console.log(`${green("Success")} | Loaded ${count}/${size} slashs commands.`);
        });
    }

    /**
     * The client events handler
     * @param {string} evtDir 
     * @param {boolean} useTs
     * @private
     */
    async _evtsHandler(evtDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(evtDir, (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach((file) => {
                if (!file.endsWith(fileType)) return size = size-1;;
                try {
                    const event = require(`${evtDir}/${file}`);
                    let eventName = file.split(".")[0];
                    this.on(eventName, event.bind(null, this));
                    delete require.cache[require.resolve(`${evtDir}/${file}`)];
        
                    count = count+1;
                } catch(err) {
                    let eventName = file.split(".")[0];
                    throw new Error(`${red("Error")} | Failed to load ${blue(eventName)} event\n${err}`);
                }
            });
            console.log(`${green("Success")} | Loaded ${count}/${size} events.`);
        });
    }

    /**
     * Mongodb connection creator
     * @param {string} mongoUri
     * @private
     */
    async _createConnection(mongoUri: string) {
        connect(mongoUri).then(() => {
            console.log(`[${green("Success")}] | Connected to MongoDB database.`);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}

module.exports = IgeClient;