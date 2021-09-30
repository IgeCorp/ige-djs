import SlashOptions from "./utils/SlashOptions";
import Errors from "./utils/Errrors";

export default class IgeSlash {
    name: string;
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;
    guildOnly: boolean;

    /**
     * @param {SlashOptions} slashOptions 
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