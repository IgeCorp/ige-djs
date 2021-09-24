interface CommandOptions {
    name: string,
    category: string,
    description: string,
    aliases: string[],
    usage: string[],
    example: string[],
    permission: string
    botAllowed: boolean,
    slash: boolean
}

export default CommandOptions;