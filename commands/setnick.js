const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "setnick",
        aliases: ["sn", 'nick'],
        description: "Устанавливает Или Изменяет Ник Пользователя",
        usage: "[mention | name | nickname | ID] <nickname>",
  run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**У Вас Нет Прав На Изменение Ника!**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**У Меня Нет Прав На Изменение Ника!**");
      
        if (!args[0]) return message.channel.send("**Пожалуйста, напишите Пользователя!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Пожалуйста, Введите Ник Пользователя!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Невозможно установить или изменить ник этого пользователя!**')

        if (!args[1]) return message.channel.send("**Пожалуйста введите ник**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Вы изменили ник ${member.displayName} на ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Отсутствуют разрешения")
        }

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Сменить ник**", "setnick")
            .addField("**Ник изменен на**", member.user.username)
            .addField("**Ник изменил**", message.author.username)
            .addField("**Ник изменился на**", args[1])
            .addField("**Дата**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}