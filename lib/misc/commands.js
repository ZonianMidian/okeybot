const { client } = require('./connections.js')
const utils = require('../utils/utils.js');
const fs = require('fs');

client.commands = {};
const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands[command.name] = command
}

client.knownCommands = {
    "fun": ['8ball', 'copypasta', 'dadjoke', 'donger', 'fill', '%', 'pyramid', 'yourmom', 'cat', 'dog', 'firstmsg', 'randline', 'randclip', 'mostsent', 'stalk', 'funfact', 'lines', 'everyone', 'hug'],
    "bot": ['ping', 'prefix', 'pajbot', 'help', 'botsubs', 'botinfo', 'suggest', 'cmd'],
    "utility": ['title', 'uptime', 'tts', 'weather', 'notify', 'user', 'steam', 'geoip', 'query', 'chatters', 'findmsg', 'esearch', 'avatar', 'math', 'stats', '7tvupdates', 'emote', 'epicgames', 'tenor', 'confusables', 'transform', 'spam', 'clear'],
}

let cmdsJSON = {}
for (const cateogry of Object.keys(client.knownCommands)) {
    cmdsJSON[cateogry] = []
    for (const cmdName of client.knownCommands[cateogry]) {
        const cmd = client.commands[cmdName]

        let badgeURL;
        switch (cmd.access) {
            case "mod": badgeURL = 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2'; break;
            case "vip": badgeURL = 'https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2'; break;
        }

        cmdsJSON[cateogry][cmd.name] = {
            name: cmd.name,
            aliases: cmd.aliases,
            description: cmd.description,
            access: cmd.access,
            accessBadge: badgeURL,
            cooldown: cmd.cooldown,
            usage: cmd.usage,
        }
    }
}
utils.redis.set(`ob:help`, JSON.stringify(cmdsJSON))