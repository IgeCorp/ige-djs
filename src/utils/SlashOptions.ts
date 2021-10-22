import { ApplicationCommandType } from "discord.js";
import SlashsCommandsOptions from "./SlashsCommandsOptions";

interface SlashOptions {
    /**
     * @description The slash command name.
     */
    name: string,
    /**
     * @description The slash command description.
     */
    description: string,
    /**
     * @description The slash command type (CHAT_IMPUT, USER, MESSAGE).
     */
    type?: ApplicationCommandType,
    /**
     * @description The slash command options (choices, ...)
     */
    options?: SlashsCommandsOptions[],
    /**
     * @description The slash command defaultPermission.
     */
    defaultPermission?: boolean,
    /**
     * @description Set true or false if you want this command to one guild only.
     */
    guildOnly?: boolean
}

export default SlashOptions;