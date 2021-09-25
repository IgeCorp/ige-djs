import SlashOptions from "./utils/SlashOptions";
import Errors from "./utils/Errrors";

export default class IgeCommand {
    name: string;
    category: string;
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;

    /**
     * @param {SlashOptions} slashOptions 
     */
    constructor(slashOptions: SlashOptions) {
        if (!slashOptions.name) throw new Error(Errors.MISSING_CMD_NAME);
        if (!slashOptions.category) throw new Error(Errors.MISSING_CMD_CAT);
        if (!slashOptions.usage) throw new Error(Errors.MISSING_CMD_USAGE);
        if (!slashOptions.permission) slashOptions.permission = "everyone";

        this.name = slashOptions.name;
        this.category = slashOptions.category;
        this.description = slashOptions?.description;
        this.aliases = slashOptions?.aliases;
        this.usage = slashOptions.usage;
        this.example = slashOptions?.example;
        this.permission = slashOptions.permission;
    }
}

module.exports = IgeCommand;