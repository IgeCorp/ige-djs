import SlashOptions from "./utils/SlashOptions";
import Errors from "./utils/Errrors";
import { ApplicationCommandType } from "discord.js";
import SlashsCommandsOptions from "./utils/SlashsCommandsOptions";

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
    type?: ApplicationCommandType;
    options?: SlashsCommandsOptions[];
    defaultPermission?: boolean;
    guildOnly?: boolean;

    /**
     * @param {SlashOptions} slashOptions The slash command options.
     */
    constructor(slashOptions: SlashOptions) {
        if (!slashOptions) throw new Error(Errors.MISSING_SLASH_OPTIONS);
        if (!slashOptions.name) throw new Error(Errors.MISSING_CMD_NAME);
        if (!slashOptions.description) throw new Error(Errors.MISSING_SLASH_DESC);

        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions?.type || "CHAT_INPUT";
        this.options = slashOptions?.options;
        this.defaultPermission = slashOptions?.defaultPermission || true;
        this.guildOnly = slashOptions?.guildOnly || false;
    }
}

module.exports = IgeSlash;