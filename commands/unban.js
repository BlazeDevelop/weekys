const { MessageEmbed, Message } = require("discord.js")

const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'unban',
    description: "Unbans a previously banned member",
    run: async(client, message, args) => {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            const unbanerror = new MessageEmbed()
            .setDescription("У Вас Нет Разрешений На Разбан Участников")
            .setColor('#34ebe5')

            return message.channel.send(unbanerror)
        } else if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
            const unbanerror2 = new MessageEmbed()
            .setDescription("У Меня Нет Разрешений На Разбан Участников. Убедитесь, Что Вы Дали Мне Соответствующие Разрешения")
            .setColor('#34ebe5')

            return message.channel.send(unbanerror2)
        } else if(!mentionedUser) {
            const unbanerror3 = new MessageEmbed()
            .setDescription("Вам Нужно Упомянуть Забаненного Участника, чтобы Разблокировать")
            .setColor('#34ebe5')

            return message.channel.send(unbanerror3)
        }

        const allBans = await message.guild.fetchBans()
        const bannedUser = allBans.get(mentionedUser.id)

        if(!bannedUser) {
            const unbanerr = new MessageEmbed()
            .setDescription("Этот Участник не забанен")
            .setColor('#34ebe5')    
            
            return message.channel.send(unbanerr)
        }

        const reason = args.slice(1).join(' ')

        message.guild.members.unban(mentionedUser.id, [reason]).catch(err => console.log(err))

        const unbanSuccess = new MessageEmbed()
        .setTitle('Успешно!')
        .setDescription(`Пользователь ${mentionedUser} ${reason ? `Разбанен по причине **${reason}**` : ''}`)
        .setColor('#34ebe5')


        message.channel.send(unbanSuccess)


    }
}