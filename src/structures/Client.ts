import axios from "axios";
import { Client as DiscordClient } from "discord.js";
import { resolve } from "path";

import { ClientOptions, ClientData, Errors } from "../interfaces";
import type { ClientOptions as DiscordClientOptions } from "discord.js";
import { ApplicationCommand } from "../interfaces/command";

/**
 * IgeCorp framework Client
 */
export class Client extends DiscordClient
{
    /**
     * All client data (commands, slashs, buttons, ...)
     * @type {ClientData}
     */
    public readonly data: ClientData;

    /**
     * Client test guild for slash commands or other tests
     * @type {string}
     */
    public readonly testGuildId: string;

    constructor(options: ClientOptions, clientOptions?: DiscordClientOptions)
    {
        super(options || clientOptions);

        this.testGuildId = options.testGuildId;
        this.data = {
            api: {
                baseUrl: `https://discord.com/api/v10`,
                headers: {
                    Authorization: `Bot ${this.token}`,
                    "Content-Type": "application/json"
                },
                commands: {
                    global: "/applications/{application_id}/commands",
                    guild: "/applications/{application_id}/guilds/{guild_id}/commands"
                }
            },
            showLogs: options.showLogs || true
        }
    }

    /**
     * Post a slash command to discord api
     * @param slash {ApplicationCommand}
     */
    private async postSlash(slash: ApplicationCommand): Promise<void>
    {
        const { api } = this.data;

        // Verify if the client is ready
        if (!this.isReady()) return console.error(Errors.clientNotReady);

        const guildUrl = api.baseUrl + api.commands.guild.replace("{application_id}", this.user.id).replace("{guild_id}", this.testGuildId);
        const apiUrl = api.baseUrl + api.commands.global.replace("{application_id}", this.user.id);

        try {
            if (slash.guild_only) await axios({
                method: "post",
                url: guildUrl,
                headers: api.headers,
                data: slash.data
            });

            else await axios({
                method: "post",
                url: apiUrl,
                headers: api.headers,
                data: slash.data
            });
        } catch (error: any) {
            throw new Error(error);
        }

        this.sendLogs(`${slash.data.name} posted`);
    }

    /**
     * Send a message to the console, only if showLogs is equal to `true` in the client parameters
     * @param message {any}
     */
    public sendLogs(message: any): void
    {
        if (this.data.showLogs === true) console.log(message)
    }
}