interface CommandOptions {
    name: string,
    category: string,
    description: string,
    aliases: string[],
    usage: string[],
    example: string[],
    permission: string
}

export default CommandOptions;