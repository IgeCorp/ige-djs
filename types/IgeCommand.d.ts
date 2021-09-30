import CommandOptions from "./utils/CommandOptions";
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
    constructor(commandOptions: CommandOptions);
}
