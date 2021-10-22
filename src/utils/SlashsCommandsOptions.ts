import { ApplicationCommandOptionType } from "discord.js";
import SlashsCommandsOptionsChoices from "./SlashsCommandsOptionsChoices";

interface SlashsCommandsOptions {
    /**
     * @description The type of the option
     */
    type: ApplicationCommandOptionType,
    /**
     * @description The name of the option
     */
    name: string,
    /**
     * @description The description of the option
     */
    description: string,
    /**
     * @description Whether the option is required
     */
    required: boolean,
    /**
     * @description The choices of the option for the user to pick from
     */
    choices?: SlashsCommandsOptionsChoices[],
    /**
     * @description Additional options if this option is a subcommand (group)
     */
    options?: SlashsCommandsOptions
}

export default SlashsCommandsOptions;