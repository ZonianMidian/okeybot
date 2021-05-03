module.exports = {
    name: 'lines',
    description: 'sends the specified user messages count',
    cooldown: 5,
    async execute(client, msg, utils) {
        const user = msg.args.length ? msg.args[0].replace('@', '') : msg.user.login
        if (user === process.env.botusername) return { text: 'monkaS', reply: true }
        const messages = (await utils.query(`SELECT COUNT(id) AS entries FROM messages WHERE channel_id=? AND user_login=?`, [msg.channel.id, user]))[0].entries
        if (!messages) return { text: 'that user has not said anything in this channel', reply: true }
        return { text: `${user === msg.user.login ? 'you' : 'that user'} have ${messages} logged messages in this channel`, reply: true }
    },
};