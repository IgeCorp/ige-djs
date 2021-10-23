interface ClientOptions {
    /**
     * @description Its a boolean value to set if the bot mention or no a user when it reply a message.
     */
    replies: boolean,
    /**
     * @description The client prefix.
     */
    prefix: string,
    /**
     * @description The client owner user ID.
     */
    owner: string[],
    /**
     * @description The client test guild id.
     */
    testGuild: string
}

export default ClientOptions;