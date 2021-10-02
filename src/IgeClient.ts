import { ApplicationCommandData, Client, Collection } from "discord.js";
import Errors from "./utils/Errrors";
import ClientOptions from "./utils/ClientOptions";
import Options from "./utils/Options";
import Intents from "./utils/Intents";
import { readdir } from "fs";
import { blue, green, red } from "colors";
import { connect } from "mongoose";
import { glob } from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

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
    owner: string;
    owners!: object;
    testGuild: string;
    private _slashsArray: ApplicationCommandData[];
    
    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
     * @param {boolean} options.replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     * @param {string} options.prefix The client prefix.
     * @param {string} options.owner The client owner user ID.
     * @param {string[]} options.owners Other client owners id (don't use if the client have one owner).
     * @param {string} options.testGuild The client test guild id.
     */
    constructor(token: string, options?: ClientOptions) {
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

        this._slashsArray = [];

        this.owner = options.owner;
        if (options.owners) this.owners = options.owners;
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
     * @param {string} options.commandsDir The client commands directory.
     * @param {string} options.slashsDir The client slashs commands directory.
     * @param {string} options.eventsDir The client events directory.
     * @param {string} options.mongoUri Mongodb connection uri.
     */
    async params(options: Options) {
        if (!options.commandsDir) throw new Error(Errors.MISSING_CMD_DIR);
        if (!options.slashsDir) throw new Error(Errors.MISSING_SLASH_DIR);
        if (!options.eventsDir) throw new Error(Errors.MISSING_EVT_DIR);
        if (!options.mongoUri) console.warn(red(`WARNING: `) + Errors.MISSING_MONGO_URI);

        const cmdDir = `${process.cwd()}/${options.commandsDir}`,
            slashDir = `${process.cwd()}/${options.slashsDir}`,
            evtDir = `${process.cwd()}/${options.eventsDir}`;

        this._cmdsHandler(cmdDir);
        this._slashHandler(slashDir);
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
                
                try {
                    const command = require(`${cmdDir}/${file}`);
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
     * @param {string} slashDir 
     */
    async _slashHandler(slashDir: string) {
        const slashCommands = await globPromise(
            `${slashDir}/*.js`
        );
        
        let size = slashCommands.length,
            count = 0;

        slashCommands.map(async (value) => {
            const file = require(value);
            try {
                this.slashs.set(file.name, value);

                if(['MESSAGE', 'USER'].includes(file.type)) delete file.description;
                if(file.userPermissions) file.defaultPermission = false;
                this._slashsArray.push(file);

                count = count+1;
            } catch (err) {
                const slashName = file.split(".")[0];
                throw new Error(`${red("Error")} | Failed to load ${blue(slashName)} slash command.\n${err.stack || err}`);
            }
        });

        console.log(`${green("Success")} | Loaded ${count}/${size} slash commands.`);

        console.log(this._slashsArray);

        await this.application?.commands.set(this._slashsArray);
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