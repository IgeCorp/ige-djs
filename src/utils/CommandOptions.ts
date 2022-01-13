export default interface CommandOptions {
    /**
     * @param {string} name The command name
     */
    name: string,
    /**
     * @param {string} category The command category.
     */
    category: string,
    /**
     * @param {string} description The command description.
     */
    description?: string,
    /**
     * @param {string[]} aliases The command aliases.
     */
    aliases?: string[],
    /**
     * @param {string[]} usage The command usages.
     */
    usage: string[],
    /**
     * @param {string[]} example The command example.
     */
    example?: string[],
    /**
     * @param {string} permission The command permission.
     */
    permission?: string,
    /**
     * @param {boolean} botAllowed Set true or false to define if a bot can use this command.
     */
    botAllowed?: boolean
}