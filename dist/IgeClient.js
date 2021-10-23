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
 * ```
 */
class IgeClient extends discord_js_1.Client {
    commands;
    slashs;
    prefix;
    owner;
    testGuild;
    /**
     * @param {string} token The discord client token
     * @param {ClientOptions} options Discord client options (replies, prefix, owner, ...)
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
    async params(options) {
        if (!options)
            throw new Error(Errrors_1.default.MISSING_OPTIONS);
        let useTs;
        if (!options.commandsDir)
            throw new Error(Errrors_1.default.MISSING_CMD_DIR);
        if (!options.slashsDir)
            throw new Error(Errrors_1.default.MISSING_SLASH_DIR);
        if (!options.eventsDir)
            throw new Error(Errrors_1.default.MISSING_EVT_DIR);
        if (!options?.mongoUri)
            console.warn((0, colors_1.red)(`WARNING: `) + Errrors_1.default.MISSING_MONGO_URI);
        (options?.typescript === true) ? useTs = true : useTs = false;
        const cmdDir = `${process.cwd()}/${options.commandsDir}`, slashDir = `${process.cwd()}/${options.slashsDir}`, evtDir = `${process.cwd()}/${options.eventsDir}`;
        this._cmdsHandler(cmdDir, useTs);
        this._slashHandler(slashDir, useTs);
        this._evtsHandler(evtDir, useTs);
        if (options.mongoUri)
            this._createConnection(options.mongoUri);
    }
    /**
     * @param {string} cmdDir
     * @param {boolean} useTs
     */
    async _cmdsHandler(cmdDir, useTs) {
        let fileType = (useTs === true) ? ".ts" : ".js";
        (0, fs_1.readdir)(cmdDir, (_err, files) => {
            let size = files.length, count = 0;
            files.forEach(file => {
                if (!file.endsWith(fileType))
                    return;
                try {
                    const command = require(`${cmdDir}/${file}`);
                    this.commands.set(command.name, command);
                    count = count + 1;
                }
                catch (err) {
                    const cmdName = file.split(".")[0];
                    console.log(`${(0, colors_1.red)("Error")} | Failed to load ${(0, colors_1.blue)(cmdName)} command.\n${err}`);
                }
            });
            console.log(`${(0, colors_1.green)("Success")} | Loaded ${count}/${size} commands.`);
        });
    }
    /**
     * @param {string} slashDir
     * @param {boolean} useTs
     */
    async _slashHandler(slashDir, useTs) {
        let fileType = (useTs === true) ? ".ts" : ".js";
        (0, fs_1.readdir)(slashDir, async (_err, files) => {
            let size = files.length, count = 0;
            files.forEach(async (file) => {
                if (!file.endsWith(fileType))
                    return;
                try {
                    const command = require(`${slashDir}/${file}`);
                    this.slashs.set(command.name, command);
                    count = count + 1;
                }
                catch (err) {
                    const slashName = file.split(".")[0];
                    console.log(`${(0, colors_1.red)("Error")} | Failed to load ${(0, colors_1.blue)(slashName)} slash command.\n${err}`);
                }
            });
            console.log(`${(0, colors_1.green)("Success")} | Loaded ${count}/${size} slashs commands.`);
        });
    }
    /**
     * @param {string} evtDir
     * @param {boolean} useTs
     */
    async _evtsHandler(evtDir, useTs) {
        let fileType = (useTs === true) ? ".ts" : ".js";
        (0, fs_1.readdir)(evtDir, (_err, files) => {
            const size = files.length;
            let count = 0;
            files.forEach((file) => {
                if (!file.endsWith(fileType))
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
                    throw new Error(`${(0, colors_1.red)("Error")} | Failed to load ${(0, colors_1.blue)(eventName)} event\n${err}`);
                }
            });
            console.log(`${(0, colors_1.green)("Success")} | Loaded ${count}/${size} events.`);
        });
    }
    /**
     * @param {string} mongoUri
     */
    async _createConnection(mongoUri) {
        (0, mongoose_1.connect)(mongoUri).then(() => {
            console.log(`[${(0, colors_1.green)("Success")}] Connected to MongoDB database.`);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
exports.default = IgeClient;
module.exports = IgeClient;