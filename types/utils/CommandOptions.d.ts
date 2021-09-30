interface CommandOptions {
    name: string;
    category: string;
    description: string;
    aliases: string[];
    usage: string[];
    example: string[];
    permission: string;
    botAllowed: boolean;
}
export default CommandOptions;
