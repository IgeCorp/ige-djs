import { Client, Collection } from "discord.js";
import Errors from "./utils/Errrors";
import ClientOptions from "./utils/ClientOptions";
import Options from "./utils/Options";
import Intents from "./utils/Intents";
import { readdir } from "fs";
import { blue, green, red } from "colors";
import { connect } from "mongoose";

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
export default class IgeClient extends Client {
    commands: Collection<unknown, unknown>;
    slashs: Collection<unknown, unknown>;
    prefix: string;
    owner: string | string[];
    testGuild: string;
    
    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     */
    constructor(token: string, options: ClientOptions) {
        if (!token) throw new Error(Errors.MISSING_TOKEN);
        if (!options) throw new Error(Errors.MISSING_CLIENT_OPTIONS);
        if (!options.prefix) throw new Error(Errors.MISSING_PREFIX);
        if (!options.owner) throw new Error(Errors.MISSING_OWNER_ID);
        if (!options.testGuild) throw new Error(Errors.MISSING_GUILD_ID);

        super({
            partials: ["USER","CHANNEL","GUILD_MEMBER","MESSAGE","REACTION"],
            allowedMentions: {
                repliedUser: options.replies || false
            },
            failIfNotExists: false,
            intents: Intents
        });

        this.commands = new Collection();
        this.slashs = new Collection();
        this.prefix = options.prefix;

        this.owner = options.owner;
        this.testGuild = options.testGuild;

        this.login(token);
    }

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
    async params(options: Options) {
        if (!options) throw new Error(Errors.MISSING_OPTIONS)
        let useTs;
        if (!options.commandsDir) throw new Error(Errors.MISSING_CMD_DIR);
        if (!options.slashsDir) throw new Error(Errors.MISSING_SLASH_DIR);
        if (!options.eventsDir) throw new Error(Errors.MISSING_EVT_DIR);
        if (!options?.mongoUri) console.warn(red(`WARNING: `) + Errors.MISSING_MONGO_URI);
        (options?.typescript === true) ? useTs = true : useTs = false;

        const cmdDir = `${process.cwd()}/${options.commandsDir}`,
            slashDir = `${process.cwd()}/${options.slashsDir}`,
            evtDir = `${process.cwd()}/${options.eventsDir}`;

        this._cmdsHandler(cmdDir, useTs);
        this._slashHandler(slashDir, useTs);
        this._evtsHandler(evtDir, useTs);
        if (options.mongoUri) this._createConnection(options.mongoUri);
    }
    
    /**
     * @param {string} cmdDir 
     * @param {boolean} useTs
     */
    async _cmdsHandler(cmdDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(cmdDir, (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach(file => {
                if (!file.endsWith(fileType)) return;
                
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
     * @param {string} slashDir 
     * @param {boolean} useTs
     */
    async _slashHandler(slashDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(slashDir, async (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach(async file => {
                if (!file.endsWith(fileType)) return;
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
     * @param {string} evtDir 
     * @param {boolean} useTs
     */
    async _evtsHandler(evtDir: string, useTs: boolean) {
        let fileType = (useTs === true) ? ".ts" : ".js"
        readdir(evtDir, (_err, files) => {
            const size = files.length;
            let count = 0;
            files.forEach((file) => {
                if (!file.endsWith(fileType)) return;
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
     * @param {string} mongoUri 
     */
    async _createConnection(mongoUri: string) {
        connect(mongoUri).then(() => {
            console.log(`[${green("Success")}] Connected to MongoDB database.`);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}

module.exports = IgeClient;