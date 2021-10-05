import { ApplicationCommandOptionType } from "discord.js";
import SlashsCommandsOptionsChoices from "./SlashsCommandsOptionsChoices";

interface SlashsCommandsOptions {
    type: ApplicationCommandOptionType,
    name: string,
    description: string,
    required: boolean,
    choices: SlashsCommandsOptionsChoices[],
    options: SlashsCommandsOptions
}

export default SlashsCommandsOptions;