import type { ClientOptions as DiscordClientOptions } from "discord.js";

/**
 * Client Options
 */
export interface ClientOptions extends DiscordClientOptions
{
    prefix: string,
    testGuildId: string,
    showLogs?: boolean
}

/**
 * Client Data
 */
export declare type ClientData = {
    api: {
        baseUrl: string,
        headers: {
            Authorization: string,
            "Content-Type": string
        },
        commands: {
            global: string,
            guild: string
        }
    },
    showLogs: boolean
}
