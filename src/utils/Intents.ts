const DiscordJS = require("discord.js");

const Intents = [
    DiscordJS.Intents.FLAGS.GUILDS,
    DiscordJS.Intents.FLAGS.GUILD_MEMBERS,
    DiscordJS.Intents.FLAGS.GUILD_BANS,
    DiscordJS.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    DiscordJS.Intents.FLAGS.GUILD_INTEGRATIONS,
    DiscordJS.Intents.FLAGS.GUILD_WEBHOOKS,
    DiscordJS.Intents.FLAGS.GUILD_INVITES,
    DiscordJS.Intents.FLAGS.GUILD_VOICE_STATES,
    DiscordJS.Intents.FLAGS.GUILD_PRESENCES,
    DiscordJS.Intents.FLAGS.GUILD_MESSAGES,
    DiscordJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    DiscordJS.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    DiscordJS.Intents.FLAGS.DIRECT_MESSAGES,
    DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    DiscordJS.Intents.FLAGS.DIRECT_MESSAGE_TYPING
]

export default Intents