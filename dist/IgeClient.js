"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Errrors_1 = __importDefault(require("./utils/Errrors"));
const Intents_1 = __importDefault(require("./utils/Intents"));
const fs_1 = require("fs");
const colors_1 = require("colors");
const mongoose_1 = require("mongoose");
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
class IgeClient extends discord_js_1.Client {
    commands;
    slashs;
    prefix;
    owner;
    owners;
    testGuild;
    /**
     * @param {string} token Discord Bot Token
     * @param {ClientOptions?} options Discord Client Options
     */
    constructor(token, options) {
        if (!token)
            throw new Error(Errrors_1.default.MISSING_TOKEN);
        if (!options)
            throw new Error(Errrors_1.default.MISSING_CLIENT_OPTIONS);
        if (!options.prefix)
            throw new Error(Errrors_1.default.MISSING_PREFIX);
        if (!options.owner)
            throw new Error(Errrors_1.default.MISSING_OWNER_ID);
        if (!options.testGuild)
            throw new Error(Errrors_1.default.MISSING_GUILD_ID);
        super({
            partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
            allowedMentions: {
                repliedUser: options.replies || false
            },
            failIfNotExists: false,
            intents: Intents_1.default
        });
        this.commands = new discord_js_1.Collection();
        this.slashs = new discord_js_1.Collection();
        this.prefix = options.prefix;
        this.owner = options.owner;
        if (options.owners)
            this.owners = options.owners;
        this.testGuild = options.testGuild;
        this.login(token);
    }
    /**
     * @param {Options} options Bot options (commands dir, events dir, mongodb uri, ...)
     */
    async params(options) {
        if (!options.commandsDir)
            throw new Error(Errrors_1.default.MISSING_CMD_DIR);
        if (!options.slashsDir)
            throw new Error(Errrors_1.default.MISSING_SLASH_DIR);
        if (!options.eventsDir)
            throw new Error(Errrors_1.default.MISSING_EVT_DIR);
        if (!options.mongoUri)
            console.warn(colors_1.red(`WARNING: `) + Errrors_1.default.MISSING_MONGO_URI);
        const cmdDir = `${process.cwd()}/${options.commandsDir}`, slashDir = `${process.cwd()}/${options.slashsDir}`, evtDir = `${process.cwd()}/${options.eventsDir}`;
        this._cmdsHandler(cmdDir);
        this._slashHandler(slashDir);
        this._evtsHandler(evtDir);
        if (options.mongoUri)
            this._createConnection(options.mongoUri);
    }
    /**
     * @param {string} cmdDir
     */
    async _cmdsHandler(cmdDir) {
        fs_1.readdir(cmdDir, (_err, files) => {
            let size = files.length, count = 0;
            files.forEach(file => {
                if (!file.endsWith(".js"))
                    return;
                try {
                    const command = require(`${cmdDir}/${file}`);
                    this.commands.set(command.name, command);
                    count = count + 1;
                }
                catch (err) {
                    const cmdName = file.split(".")[0];
                    console.log(`${colors_1.red("Error")} | Failed to load ${colors_1.blue(cmdName)} command.\n${err.stack || err}`);
                }
            });
            console.log(`${colors_1.green("Success")} | Loaded ${count}/${size} commands.`);
        });
    }
    /**
     * @param {string} slashDir
     */
    async _slashHandler(slashDir) {
        fs_1.readdir(slashDir, (_err, files) => {
            let size = files.length, count = 0;
            files.forEach(file => {
                if (!file.endsWith(".js"))
                    return;
                try {
                    const slash = require(`${slashDir}/${file}`);
                    this.slashs.set(slash.name, slash);
                    count = count + 1;
                }
                catch (err) {
                    const slashName = file.split(".")[0];
                    console.log(`${colors_1.red("Error")} | Failed to load ${colors_1.blue(slashName)} slash command.\n${err.stack || err}`);
                }
            });
            console.log(`${colors_1.green("Success")} | Loaded ${count}/${size} slashs commands.`);
        });
    }
    /**
     * @param {string} evtDir
     */
    async _evtsHandler(evtDir) {
        fs_1.readdir(evtDir, (_err, files) => {
            const size = files.length;
            let count = 0;
            files.forEach((file) => {
                if (!file.endsWith(".js"))
                    return;
                try {
                    const event = require(`${evtDir}/${file}`);
                    let eventName = file.split(".")[0];
                    this.on(eventName, event.bind(null, this));
                    delete require.cache[require.resolve(`${evtDir}/${file}`)];
                    count = count + 1;
                }
                catch (err) {
                    let eventName = file.split(".")[0];
                    throw new Error(`${colors_1.red("Error")} | Failed to load ${colors_1.blue(eventName)} event\n${err.stack || err}`);
                }
            });
            console.log(`${colors_1.green("Success")} | Loaded ${count}/${size} events.`);
        });
    }
    /**
     * @param {string} mongoUri
     */
    async _createConnection(mongoUri) {
        mongoose_1.connect(mongoUri).then(() => {
            console.log(`[${colors_1.green("Success")}] Connected to MongoDB database.`);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
exports.default = IgeClient;
module.exports = IgeClient;
