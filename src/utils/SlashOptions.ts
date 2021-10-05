import { ApplicationCommandType } from "discord.js";
import SlashsCommandsOptions from "./SlashsCommandsOptions";

interface SlashOptions {
    name: string,
    description: string,
    type: ApplicationCommandType,
    options: SlashsCommandsOptions[],
    defaultPermission: boolean,
    guildOnly: boolean
}

export default SlashOptions;