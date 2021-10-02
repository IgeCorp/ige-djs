import SlashOptions from "./utils/SlashOptions";
import Errors from "./utils/Errrors";
import { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";

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
export default class IgeSlash {
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
    constructor(slashOptions: SlashOptions) {
        if (!slashOptions.name) throw new Error(Errors.MISSING_CMD_NAME);
        if (!slashOptions.description) throw new Error(Errors.MISSING_SLASH_DESC);
        if (!slashOptions.guildOnly) slashOptions.guildOnly = false;

        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions.type;
        this.options = slashOptions.options;
        this.defaultPermission = slashOptions.defaultPermission;
        this.guildOnly = slashOptions.guildOnly;
    }
}

module.exports = IgeSlash;