# IgeDJS

## IgeDJS is a [npm](https://npmjs.com) module

### Installation

#### Latest version

```shell
npm i @igecorp/ige-djs
```

#### Dev Version

```shell
npm i https://github.com/IgeCorp/ige-djs
```

### Example

#### Login CLient

`index.js`

```js
const IgeDJS = require("@igecorp/ige-djs");

const client = new IgeDJS.IgeClient("Discord Bot Token", { replies: true, prefix: "!" }); //Replace "replies: true" by "replies: false" if you don't want any mentions.

client.param({
    commandsDir: "commands", //Replace it by your client commands directory.
    eventsDir: "events" //Replace it by your client events directory.
});
```

`events/ready.js`

```js
module.exports = async (client) => {
    console.log(`${client.user.tag} is ready.`);

    client.user.setActivity(`I'm using @igecorp/ige-djs npm module !`, { type: "PLAYING" });
}
```

`events/messageCreate.js`

```js
module.exports = async (client, message) => {
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;
    
    const cmd = client.commands.get(command) || client.commands.find(x => x.aliases.includes(command));

    if (!cmd) return message.reply({ content: `I have not command named ${command}.` });

    cmd.run(message, args, client);
}
```

`commands/ping.js`

```js
const IgeDJS = require("@igecorp/ige-djs");

class ping extends IgeDJS.IgeCommand {
    constructor() {
        super({
            name: "ping",
            category: "utility",
            usage: "ping"
        });
    }

    async run(message) {
        message.channel.send(`Pong: \`${Date.now() - message.createdTimestamp}ms\``);
    }
}
```

© 2021 Copyright: IgeCorp
