import { ApplicationCommandOptionType } from "discord.js";
import SlashDescriptionLocalizations from "./SlashDescriptionLocalizations";
import SlashNameLocalizations from "./SlashNameLocalizations";
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
     * @param {SlashNameLocalizations} name_localizations Option name in differents locales
     */
    name_localizations: SlashNameLocalizations,
    /**
     * @param {string} description The description of the option
     */
    description: string,
    /**
     * @param {SlashDescriptionLocalizations} description_localizations Option description in differents locales
     */
    description_localizations: SlashDescriptionLocalizations,
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