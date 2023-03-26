const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    description: "Kicks The Mentioned Member",
    run: async(client, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.hasPermission('KICK_MEMBERS')) {
            const kickerror = new MessageEmbed()
            .setDescription("У Вас Нет Прав На То, Чтобы Кикнуть Участников")
            .setColor('#34ebe5')

            return message.channel.send(kickerror)
        } else if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
            const kickerror2 = new MessageEmbed()
            .setDescription("У Меня Нет Разрешений На То, Чтобы Кикать Участников. Убедитесь, Что Вы Дали Мне Соответствующие Разрешения")
            .setColor('#34ebe5')

            return message.channel.send(kickerror2)
        } else if (!mentionedMember) {
            const kickerror3 = new MessageEmbed()
            .setDescription("Вам Нужно Указать Участника, Которого Вы Хотите Кикнуть")
            .setColor('#34ebe5')

            return message.channel.send(kickerror3)
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {  
            const kickerr = new MessageEmbed()
            .setDescription("Вы не можете кикнуть этого участника, потому что его роль выше / равна вашей")
            .setColor('#34ebe5')
            
            return message.channel.send(kickerr)
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
            .setDescription("Я не могу кикнуть этого участника, потому что его роль выше / равна моей")
            .setColor('#34ebe5')

            return message.channel.send(kickerr2)
        }

        const reason = args.slice(1).join(' ')

        try {
            await mentionedMember.kick([reason])

            const kickSuccess = new MessageEmbed()
            .setTitle('Успешно')
            .setDescription(`Кикнут ${mentionedMember} ${reason ? `за **${reason}**` : ''}`)
            .setColor('#34ebe5')

            message.channel.send(kickSuccess)

        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
            .setDescription("Произошла непредвиденная ошибка при кике этого участника")
            .setColor('#34ebe5')
            
            message.channel.send(errorEmbed)
        }
    }
}














