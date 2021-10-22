interface Options {
    /**
     * @description Set default to true, set it to false to use javascript files.
     */
    typescript?: boolean,
    /**
     * @description The client commands directory.
     */
    commandsDir: string,
    /**
     * @description The client slashs commands directory.
     */
    slashsDir: string,
    /**
     * @description The client events directory.
     */
    eventsDir: string,
    /**
     * @description Mongodb connection uri.
     */
    mongoUri?: string
}

export default Options;