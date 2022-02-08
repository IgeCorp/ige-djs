import type { ClientOptions } from "discord.js";

export default interface IgeOptions extends ClientOptions {
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