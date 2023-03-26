const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    category: "extra",
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Европа';
                break;
            case "us-east":
                region = '🇺🇸 Восток'
                break;
            case "us-west":
                region = '🇺🇸 Запад';
                break;
            case "us-south":
                region = '🇺🇸 Юг'
                break;
            case "us-central":
                region = '🇺🇸 Центр'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Владелец: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Участников: ",
                    value: `Всего ${message.guild.memberCount} Участников!`,
                    inline: true
                },
                {
                    name: "Участников онлайн: ",
                    value: `Всего ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} Участников онлайн!`,
                    inline: true
                },
                {
                    name: "Всего ботов: ",
                    value: `Всего ${message.guild.members.cache.filter(m => m.user.bot).size} Ботов!`,
                    inline: true
                },
                {
                    name: "Дата создания: ",
                    value: message.guild.createdAt.toLocaleDateString("ru-ru"),
                    inline: true
                },
                {
                    name: "Кол-во ролей: ",
                    value: `Всего ${message.guild.roles.cache.size} ролей на этом сервере.`,
                    inline: true,
                },
                {
                    name: `🗺 Регион: `,
                    value: region,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }
}