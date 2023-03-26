const { MessageEmbed } = require("discord.js")

const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'ban',
    description: "Bans a mentioned member",
    run: async(client, message, args) => {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            const banerror = new MessageEmbed()
            .setDescription("У вас нет прав!")
            .setColor('#34ebe5')

            return message.channel.send(banerror)
        } else if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
            const banerror2 = new MessageEmbed()
            .setDescription("У меня нет прав на бан, выдайте мне права на бан тогда я смогу забанить!")
            .setColor('#34ebe5')

            return message.channel.send(banerror2)
        } else if(!mentionedUser) {
            const banerror3 = new MessageEmbed()
            .setDescription("Упомяните участника для бана!")
            .setColor('#34ebe5')

            return message.channel.send(banerror3)
        }

        const allBans = await message.guild.fetchBans()

        if(allBans.get(mentionedUser.id)) {
            const banerr = new MessageEmbed()
            .setDescription("Пользователь уже забанен")
            .setColor('#34ebe5')

            return message.channel.send(banerr)
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

        if(mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position

            if(memberPosition <= mentionedPosition) {
                const banerr2 = new MessageEmbed()
            .setDescription("Вы не можете Забанить Этого Участника, потому что его роль выше/равна вашей")
            .setColor('#34ebe5')

            return message.channel.send(banerr2)
            } else if (botPosition <= mentionedPosition) {
                const banerr3 = new MessageEmbed()
            .setDescription("Я не могу Забанить Этого Участника, потому что его роль выше/равна моей")
            .setColor('#34ebe5')

            return message.channel.send(banerr3)
            }
        }

        const reason = args.slice(1).join(' ')

        message.guild.members.ban(mentionedUser.id, {reason: reason})

        const banSuccess = new MessageEmbed()
        .setTitle('Успешно!')
        .setDescription(`Забанен ${mentionedUser} ${reason ? `за **${reason}**` : ''}`)

        message.channel.send(banSuccess)

        
     }
}