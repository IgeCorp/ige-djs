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
 * const client = new IgeCLient("discord bot token", { replies: true, prefix: "!" });
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
    prefix: string;
    
    /**
     * @param {string} token Discord Bot Token
     * @param {ClientOptions?} options Discord Client Options
     */
    constructor(token: string, options?: ClientOptions) {
        if (!token) throw new Error(Errors.MISSING_TOKEN);
        if (!options) throw new Error(Errors.MISSING_CLIENT_OPTIONS);
        if (!options.prefix) throw new Error(Errors.MISSING_PREFIX);

        super({
            partials: ["USER","CHANNEL","GUILD_MEMBER","MESSAGE","REACTION"],
            allowedMentions: {
                repliedUser: options.replies || false
            },
            failIfNotExists: false,
            intents: Intents
        });

        this.commands = new Collection();
        this.prefix = options.prefix;

        this.login(token);
    }

    /**
     * @param {Options} options Bot options (commands dir, events dir, mongodb uri, ...)
     */
    async params(options: Options) {
        if (!options.commandsDir) throw new Error(Errors.MISSING_CMD_DIR);
        if (!options.eventsDir) throw new Error(Errors.MISSING_EVT_DIR);
        if (!options.mongoUri) console.warn(red(`WARNING: `) + Errors.MISSING_MONGO_URI);

        const cmdDir = `${process.cwd()}/${options.commandsDir}`,
            evtDir = `${process.cwd()}/${options.eventsDir}`;

        this._cmdsHandler(cmdDir);
        this._evtsHandler(evtDir);
        if (options.mongoUri) this._createConnection(options.mongoUri);
    }
    
    /**
     * @param {string} cmdDir 
     */
    async _cmdsHandler(cmdDir: string) {
        readdir(cmdDir, (_err, files) => {
            let size = files.length,
                count = 0;
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                const command = require(`${cmdDir}/${file}`);
                
                if (command.slash === true) return size = size-1;

                try {
                    this.commands.set(command.name, command);
                    count = count+1;
                } catch(err) {
                    const cmdName = file.split(".")[0];
                    console.log(`${red("Error")} | Failed to load ${blue(cmdName)} command.\n${err.stack || err}`);
                }
            });
            console.log(`${green("Success")} | Loaded ${count}/${size} commands.`);
        });
    }

    /**
     * @param {string} evtDir 
     */
    async _evtsHandler(evtDir: string) {
        readdir(evtDir, (_err, files) => {
            const size = files.length;
            let count = 0;
            files.forEach((file) => {
                if (!file.endsWith(".js")) return;
                try {
                    const event = require(`${evtDir}/${file}`);
                    let eventName = file.split(".")[0];
                    this.on(eventName, event.bind(null, this));
                    delete require.cache[require.resolve(`${evtDir}/${file}`)];
        
                    count = count+1;
                } catch(err) {
                    let eventName = file.split(".")[0];
                    throw new Error(`${red("Error")} | Failed to load ${blue(eventName)} event\n${err.stack || err}`);
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