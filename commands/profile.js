const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "profile",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "онлайн";
                break;
            case "dnd":
                status = "не беспокоить";
                break;
            case "idle":
                status = "неактивен";
                break;
            case "offline":
                status = "оффлайн";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`Профиль ${user.user.username}`)
            .setColor(`#00FFFF`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Ник: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Тег: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 Айди: ",
                    value: user.user.id,
                },
                {
                    name: "Статус: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Статус: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `Пользователь не играет в игру`,
                    inline: true
                },
                {
                    name: 'Аватарка: ',
                    value: `[Нажмите](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Дата создания: ',
                    value: user.user.createdAt.toLocaleDateString("ru-ru"),
                    inline: true
                },
                {
                    name: 'Дата входа: ',
                    value: user.joinedAt.toLocaleDateString("ru-ru"),
                    inline: true
                },
                {
                    name: 'Роли участника: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}
