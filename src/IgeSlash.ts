import SlashOptions from "./utils/SlashOptions";
import Errors from "./utils/Errrors";

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
 *             aliases: ["pingbot", "botping"],
 *             usage: "ping",
 *             example: ["ping", "pingbot", "botping"],
 *             permission: "everyone",
 *             guildOnly: false
 *         })
 *     }
 * }
 * ```
 */
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
    constructor(slashOptions: SlashOptions) {
        if (!slashOptions.name) throw new Error(Errors.MISSING_CMD_NAME);
        if (!slashOptions.usage) throw new Error(Errors.MISSING_CMD_USAGE);
        if (!slashOptions.permission) slashOptions.permission = "everyone";
        if (!slashOptions.guildOnly) slashOptions.guildOnly = false;

        this.name = slashOptions.name;
        this.description = slashOptions?.description;
        this.aliases = slashOptions?.aliases;
        this.usage = slashOptions.usage;
        this.example = slashOptions?.example;
        this.permission = slashOptions.permission;
        this.guildOnly = slashOptions.guildOnly;
    }
}

module.exports = IgeSlash;