interface CommandOptions {
    /**
     * @description The command name
     */
    name: string,
    /**
     * @description The command category.
     */
    category: string,
    /**
     * @description The command description.
     */
    description?: string,
    /**
     * @description The command aliases.
     */
    aliases?: string[],
    /**
     * @description The command usages.
     */
    usage: string[],
    /**
     * @description The command example.
     */
    example?: string[],
    /**
     * @description The command permission.
     */
    permission?: string,
    /**
     * @description Set true or false to define if a bot can use this command.
     */
    botAllowed?: boolean
}

export default CommandOptions;