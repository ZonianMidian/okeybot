module.exports = {
    name: 'pardon',
    //access: 'mod',
    noWhispers: true,
    botRequires: 'mod',
    async execute(client, msg, utils) {
        if (msg.user.login !== process.env.owner_login) return;

        const users = JSON.parse((await utils.redis.get(`ob:channel:nuke:${msg.channel.id}`)))
        if (!users) return { text: `no nuke to reverse :\\`, reply: true }

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        const userCount = users.length
        let commands = 0

        for (let i = 0; i < userCount; i++) {
            commands++
            client.privmsg(msg.channel.login, `/unban ${users[i]}`)
            if (commands === 60) {
                commands = 0
                await sleep(35000)
            }
        }

        return { text: `✅ Tried to unban ${userCount} users` }
    },
};