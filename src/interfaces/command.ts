import type { LocalizationMap } from "discord.js"

export declare type ApplicationCommand = {
    data: ApplicationCommandData,
    guild_only?: boolean
}

export declare type ApplicationCommandData = {
    name: string,
    name_localizations?: LocalizationMap,
    description: string,
    description_localizations?: LocalizationMap,
    default_member_mermissions?: string
    dm_mermission?: string,
    options?: ApplicationCommandOptions[]
}

export declare type ApplicationCommandOptions = {
    type: any,
    name: string,
    name_localizations?: LocalizationMap,
    description: string,
    description_localizations?: LocalizationMap,
    required: boolean,
    choices?: ApplicationCommandOptionsChoices[],
    options?: ApplicationCommandOptions[],
    min_value?: number,
    max_value?: number,
    autocomplete?: boolean
}

export declare type ApplicationCommandOptionsChoices = {
    name: string,
    value: string | number
}