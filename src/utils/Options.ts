interface Options {
    /**
     * @param {string} typescript Set default to true, set it to false to use javascript files.
     */
    typescript?: boolean,
    /**
     * @param {string} commandsDir The client commands directory.
     */
    commandsDir?: string,
    /**
     * @param {string} slashsDir The client slashs commands directory.
     */
    slashsDir: string,
    /**
     * @param {string} eventsDir The client events directory.
     */
    eventsDir: string,
    /**
     * @param {string} mongoUri Mongodb connection uri.
     */
    mongoUri?: string
}

export default Options;