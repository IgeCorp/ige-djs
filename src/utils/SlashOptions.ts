interface SlashOptions {
    name: string,
    description: string,
    aliases: string[],
    usage: string[],
    example: string[],
    permission: string,
    guildOnly: boolean
}

export default SlashOptions;