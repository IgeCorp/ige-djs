# IgeDJS

## IgeDJS is a [npm](https://npmjs.com) module

### Documentation

https://igecorp.js.org

### Installation

#### Latest version

```shell
npm i @igecorp/ige-djs
```

#### Dev Version

Must have git on your device
```shell
npm i github:IgeCorp/ige-djs
```

### Example

#### Login CLient

`index.js`

```js
const IgeDJS = require("@igecorp/ige-djs");

const client = new IgeDJS.IgeClient("Discord Bot Token", {
    replies: true, //Replace "replies: true" by "replies: false" if you don't want any mentions.
    owner: "ownerId", //Replace this string by an Array of strings: ["id 1", "id 2", "..."]
    testGuild: "guild id" //this is for client guild only slashs
});

client.param({
    slashsDir: "slashs", //Replace it by your client commands directory.
    eventsDir: "events" //Replace it by your client events directory.
});
```

`events/ready.js`

```js
module.exports = async (client) => {
    console.log(`${client.user.tag} is ready.`);

    client.postSlashs(client.slashs); // this will post the client commands

    client.user.setActivity(`I'm using @igecorp/ige-djs npm module !`, { type: "PLAYING" });
}
```

`events/interactionCreate.js`

```js
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName) {
            try {
                await client.slashs.get(interaction.commandName).run(interaction); // Get the slash with the interaction command name and run it
            } catch(err) {
                console.error(err);
                await interaction.reply({
                    content: "An error as occured",
                    ephemeral: true
                });
            }
        }
    }
}
```

`slashs/ping.js`

```js
const IgeDJS = require("@igecorp/ige-djs");

class ping extends IgeDJS.IgeCommand {
    constructor() {
        super({
            name: "ping",
            description: "Get the client latency",
            category: "utility",
            guildOnly: true // change this to false to make this command to global (all client guilds)
        });
    }

    async run(interaction) {
        await interaction.reply({
            content: `Pong: \`${Date.now() - message.createdTimestamp}ms\``
        });
    }
}

module.exports = new ping;
```

© 2021 Copyright: IgeCorp
