import { ApplicationCommandType } from "discord.js";
import SlashsCommandsOptions from "./SlashsCommandsOptions";

export default interface SlashOptions {
    /**
     * @param {string} name The slash command name.
     */
    name: string,
    /**
     * @param {string} description The slash command description.
     */
    description: string,
    /**
     * @param {ApplicationCommandType} type The slash command type (CHAT_IMPUT, USER, MESSAGE).
     */
    type?: ApplicationCommandType,
    /**
     * @param {SlashsCommandsOptions[]} options The slash command options (choices, ...)
     */
    options?: SlashsCommandsOptions[],
    /**
     * @param {boolean} defaultPermission The slash command defaultPermission.
     */
    defaultPermission?: boolean,
    /**
     * @param {boolean} guildOnly Set true or false if you want this command to one guild only.
     */
    guildOnly?: boolean,
    /**
     * @param {string} category The slash command category
     */
    category?: string
}