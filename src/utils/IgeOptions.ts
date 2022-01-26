export default interface IgeOptions {
    /**
     * @param {boolean} replies Its a boolean value to set if the bot mention or no a user when it reply a message.
     */
    replies: boolean,
    /**
     * @param {string} [prefix=null] The client prefix.
     */
    prefix: string,
    /**
     * @param {string|string[]} owner The client owner user ID.
     */
    owner: string | string[],
    /**
     * @param {string} testGuild The client test guild id.
     */
    testGuild: string
}