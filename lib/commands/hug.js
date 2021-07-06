const twitchapi = require('../utils/twitchapi.js')

module.exports = {
    name: 'hug',
    description: 'hug somebody 🤗',
    cooldown: 3,
    async execute(client, msg, utils) {
        const user = await twitchapi.ivrUser(msg.args[0] ? msg.args[0].replace('@', '') : msg.user.login)
        if (!user) return { text: `${msg.user.login} hugs ${msg.args[0]} VirtualHug` }
        if (user.id === msg.user.id) return { text: `${msg.user.login} hugs himself FeelsBadMan` }

        let hugs;
        const data = await utils.query(`SELECT count FROM hugs WHERE user_id=?`, [user.id])

        if (!data.length) {
            await utils.query(`INSERT INTO hugs (user_id, count) VALUES (?, 1)`, [user.id])
            hugs = 1
        } else {
            await utils.query(`UPDATE hugs SET count = count + 1`)
            hugs = data[0].count + 1
        }

        return { text: `${msg.user.login} hugs ${user.displayName} VirtualHug This user has been hugged ${hugs} times` }
    },
};