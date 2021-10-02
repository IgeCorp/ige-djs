import { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";

interface SlashOptions {
    name: string,
    description: string,
    type: ApplicationCommandType,
    options: ApplicationCommandOptionData,
    defaultPermission: boolean,
    guildOnly: boolean
}

export default SlashOptions;