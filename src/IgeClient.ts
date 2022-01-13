import { Client, Collection } from "discord.js";
import Errors from "./utils/Errrors";
import IgeOptions from "./utils/IgeOptions";
import Options from "./utils/Options";
import Intents from "./utils/Intents";
import { readdir, readdirSync } from "fs";
import { connect } from "mongoose";

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/stable/class/Client}
 */

/**
 * @extends {Client}
 */
class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix: string;
    owner: string | string[];
    testGuild: string;

    /**
     * All IgeClient options
     * @typedef {Object} IgeOptions
     * @property {boolean} replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     * @property {string} prefix The client prefix.
     * @property {string|string[]} owner The client owner user ID.
     * @property {string} testGuild The client test guild id.
     */

    /**
     * @param {string} token The discord client token
     * @param {IgeOptions} options Discord client options (replies, prefix, owner, ...)
     * @returns {Promise<string>} Token of the account used
     */
    constructor(token: string, options: IgeOptions) {
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
     * @property {boolean} [typescript=false] Set default to false, set it to true to use typescript files.
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
     *     commandsDir: "commands",
     *     slashsDir: "slashs",
     *     eventsDir: "events",
     *     mongoUri: "mongodb connection uri"
     * });
     */
    async params(options: Options) {
        if (!options) throw new Error(Errors.MISSING_OPTIONS)
        if (!options.slashsDir) throw new TypeError(Errors.MISSING_SLASH_DIR);
        if (!options.eventsDir) throw new TypeError(Errors.MISSING_EVT_DIR);
        if (!options?.mongoUri) console.warn(`WARNING: ` + Errors.MISSING_MONGO_URI);
        let useTs = (options?.typescript === true) ? true : false;
        let useFolders = (options?.cmdsInFolders === true) ? true : false;

        if (options.commandsDir) this._cmdsHandler(`${process.cwd()}/${options.commandsDir}`, useTs, useFolders);
        this._slashHandler(`${process.cwd()}/${options.slashsDir}`, useTs, useFolders);
        this._evtsHandler(`${process.cwd()}/${options.eventsDir}`, useTs);
        if (options.mongoUri) this._createConnection(options.mongoUri);
    }

    /**
     * Slashs commands post method
     * @param {any} slashsArray
     */
    async postSlashs(slashsArray: any) {
        if (this.isReady() !== true) throw new Error(Errors.IS_NOT_LOGGED_IN);

        const guild = this.guilds.cache?.get(this.testGuild);
        if (!guild) throw new Error(Errors.FAILED_TO_FETCH_GUILD);

        const clientSlashs = slashsArray.filter((slash: any) => slash?.guildOnly !== true).toJSON();
        const guildSlashs = slashsArray.filter((slash: any) => slash?.guildOnly === true).toJSON();

        try {
            await this?.application?.commands.set(clientSlashs);
            await guild.commands.set(guildSlashs);
        } catch (error: any) {
            throw new Error(error);
        }

        console.log(`[Success] Slashs Commands Posted\nClient Commands: ${this?.application?.commands.cache.size}\nGuild Commands: ${guild.commands.cache.size}`);
    }
    
    /**
     * The client commands handler
     * @param {string} cmdDir 
     * @param {boolean} useTs
     * @param {boolean} useFolders
     * @private
     */
    async _cmdsHandler(cmdDir: string, useTs: boolean, useFolders: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        let count = 0;
        const files = readdirSync(cmdDir);

        if (useFolders !== true) {
            count = count + files.length;
            for (const c of files) {
                if (!c.endsWith(fileType)) return count = count-1;
                try {
                    const command = require(`${cmdDir}/${c}`);
                    this.commands.set(command.name, command);
                } catch (err) {
                    const cmdName = c.split(".")[0];
                    console.log(`[Error] | Failed to load ${cmdName} command.\n${err}`);
                }
            }
        } else {
            for (let i = 0; i < files.length; i++) {
                const commands = readdirSync(`${cmdDir}/${files[i]}`);
                count = count + commands.length;
                for(const c of commands){
                    if (!c.endsWith(fileType)) return count = count-1;
                    try {
                        const command = require(`${cmdDir}/${files[i]}/${c}`);
                        this.commands.set(command.name, command);
                    } catch (err) {
                        const cmdName = c.split(".")[0];
                        console.log(`[Error] | Failed to load ${cmdName} command.\n${err}`);
                    }
                }
            }
        }

        console.log(`[Success] | Loaded ${this.commands.size}/${count} commands.`);
    }

    /**
     * The client slash commands handler
     * @param {string} slashDir 
     * @param {boolean} useTs
     * @param {boolean} useFolders
     * @private
     */
    async _slashHandler(slashDir: string, useTs: boolean, useFolders: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        let count = 0;
        const files = readdirSync(slashDir);

        if (useFolders !== true) {
            count = count + files.length;
            for (const c of files) {
                if (!c.endsWith(fileType)) return count = count-1;
                try {
                    const command = require(`${slashDir}/${c}`);
                    this.commands.set(command.name, command);
                } catch (err) {
                    const cmdName = c.split(".")[0];
                    console.log(`[Error] | Failed to load ${cmdName} command.\n${err}`);
                }
            }
        } else {
            for (let i = 0; i < files.length; i++) {
                const commands = readdirSync(`${slashDir}/${files[i]}`);
                count = count + commands.length;
                for(const c of commands){
                    if (!c.endsWith(fileType)) return count = count-1;
                    try {
                        const slash = require(`${slashDir}/${files[i]}/${c}`);
                        this.commands.set(slash.name, slash);
                    } catch (err) {
                        const slashName = c.split(".")[0];
                        console.log(`[Error] | Failed to load ${slashName} slash command.\n${err}`);
                    }
                }
            }
        }
            console.log(`[Success] | Loaded ${this.slashs.size}/${count} slashs commands.`);
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
                    throw new Error(`[Error] | Failed to load ${eventName} event\n${err}`);
                }
            });
            console.log(`[Success] | Loaded ${count}/${size} events.`);
        });
    }

    /**
     * Mongodb connection creator
     * @param {string} mongoUri
     * @private
     */
    async _createConnection(mongoUri: string) {
        connect(mongoUri).then(() => {
            console.log(`[Success] | Connected to MongoDB database.`);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}

exports.IgeClient = IgeClient;