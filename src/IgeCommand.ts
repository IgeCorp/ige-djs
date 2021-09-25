import CommandOptions from "./utils/CommandOptions";
import Errors from "./utils/Errrors";

export default class IgeCommand {
    name: string;
    category: string;
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;
    botAllowed: boolean;

    /**
     * @param {CommandOptions} commandOptions 
     */
    constructor(commandOptions: CommandOptions) {
        if (!commandOptions.name) throw new Error(Errors.MISSING_CMD_NAME);
        if (!commandOptions.category) throw new Error(Errors.MISSING_CMD_CAT);
        if (!commandOptions.usage) throw new Error(Errors.MISSING_CMD_USAGE);
        if (!commandOptions.permission) commandOptions.permission = "everyone";
        if (!commandOptions.botAllowed) commandOptions.botAllowed = false;

        this.name = commandOptions.name;
        this.category = commandOptions.category;
        this.description = commandOptions?.description;
        this.aliases = commandOptions?.aliases;
        this.usage = commandOptions.usage;
        this.example = commandOptions?.example;
        this.permission = commandOptions.permission;
        this.botAllowed = commandOptions.botAllowed;
    }
}

module.exports = IgeCommand;