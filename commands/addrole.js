const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addrole",
  aliases: ["role", "qrole"],
  description: "Add role to any user",
run: async (bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**У Вас Нет Разрешений На Добавление Ролей Пользователям!**");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**У Меня Нет Разрешений На Добавление Ролей Пользователям! -**");
        
        if (!args[0]) return message.channel.send("**Пожалуйста, Введите Роль!**")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("**Пожалуйста, Введите Имя Пользователя через @!**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Невозможно добавить роль этому пользователю!**')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("**Не Удается Добавить Роль Этому Пользователю!**")

        if (!role) return message.channel.send("**Пожалуйста, Введите Роль!**")

        if (role.managed) return message.channel.send("**Не Удалось Найти Эту Роль!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('**Не Удается Добавить Эту Роль Пользователю!**')

        if (rMember.roles.cache.has(role.id)) return message.channel.send("**Роль В Настоящее Время Выше Меня, Поэтому Не Может Добавить Ее Пользователю!**")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Роль выдана ${rMember.user.username}`)
        message.channel.send(sembed)

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Выдача роли**", "addrole")
            .addField("**Роль выдана участнику**", rMember.user.username)
            .addField("**Выданна роль**", role.name)
            .addField("**Добавлена**", message.author.username)
            .addField("**Дата**", message.createdAt.toLocaleString())
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
};
