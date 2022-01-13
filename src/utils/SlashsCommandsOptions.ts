import { ApplicationCommandOptionType } from "discord.js";
import SlashsCommandsOptionsChoices from "./SlashsCommandsOptionsChoices";

export default interface SlashsCommandsOptions {
    /**
     * @param {ApplicationCommandOptionType} type The type of the option
     */
    type: ApplicationCommandOptionType,
    /**
     * @param {string} name The name of the option
     */
    name: string,
    /**
     * @param {string} description The description of the option
     */
    description: string,
    /**
     * @param {boolean} required Whether the option is required
     */
    required: boolean,
    /**
     * @param {SlashsCommandsOptionsChoices[]} choices The choices of the option for the user to pick from
     */
    choices?: SlashsCommandsOptionsChoices[],
    /**
     * @param {options} options Additional options if this option is a subcommand (group)
     */
    options?: SlashsCommandsOptions
}