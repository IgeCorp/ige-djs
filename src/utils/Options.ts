export default interface Options {
    /**
     * @param {string} typescript Set default to false, set it to true to use typescript files.
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
    /**
     * @param {boolean} cmdsInFolders Set this to true if you want to use basic commands and slashs command in folders.
     */
    cmdsInFolders?: boolean
}