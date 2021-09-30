import SlashOptions from "./utils/SlashOptions";
export default class IgeCommand {
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
    constructor(slashOptions: SlashOptions);
}
