const { MessageEmbed, Client } = require("discord.js")

module.exports = {
    name: 'forceban',
    description: "Force Ban someone who is not in the server using their user ID",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            const forcebanError = new MessageEmbed()
                .setDescription(`У вас нет разрешения забанить участников`)
                .setColor("RED")

            return message.channel.send(forcebanError)
        }

        let userID = args[0];
        let reason = args.slice(1).join(" ") || 'Not Specified'

        if (!userID) {
            const forcebanError2 = new MessageEmbed()
                .setDescription(`Введите ID пользователя`)
                .setColor("RED")

            return message.channel.send(forcebanError2)
        }
        if (isNaN(args[0])) {
            const forcebanError3 = new MessageEmbed()
                .setDescription(`Неверный айди`)
                .setColor("RED")

            return message.channel.send(forcebanError3)
        }
        if (userID === message.author.id) {
            const forcebanError4 = new MessageEmbed()
                .setDescription(`Вы не можете забанить себя`)
                .setColor("RED")
            return message.channel.send(forcebanError4)
        }
        if (userID === client.user.id) {
            const forcebanError5 = new MessageEmbed()
                .setDescription(`Я не хочу забанить себя. Но почему?`)
                .setColor("RED")
            return message.channel.send(forcebanError5)
        }

        if (message.guild.member(userID)) {
            const forcebanError6 = new MessageEmbed()
                .setDescription(`Этот участник уже находится на сервере. Вместо этого используйте команду "ban".`)
                .setColor("RED")
            return message.channel.send(forcebanError6)
        }

        client.users.fetch(userID).then(async user => {
            await message.guild.members.ban(user.id, { reason: reason })
            const embed = new MessageEmbed()
            .setTitle(`Успешно Забанен`)
            .setDescription(`${user.tag} был забанен \n **Причина:** ${reason}`)
            .setColor("BLUE")

            return message.channel.send(embed)
        }).catch(error => {
            const errorEmbed = new MessageEmbed()
            .setDescription(error)
            .setColor("RED")
            return message.channel.send(errorEmbed)
        })

    }
}
