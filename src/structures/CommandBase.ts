import type { ApplicationCommand, ApplicationCommandData } from "../interfaces";

export class CommandBase
{
    data: ApplicationCommandData;
    guild_only: boolean | undefined;

    constructor(commandData: ApplicationCommand)
    {
        this.data = commandData.data;
        this.guild_only = commandData.guild_only;

        return this;
    }
}