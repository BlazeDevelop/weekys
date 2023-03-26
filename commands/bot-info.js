const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "bot-info",
    category: "bot",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('#000000')
            .addFields(
                {
                    name: '🌐 Cерверов',
                    value: `Всего ${client.guilds.cache.size} Серверов.`,
                    inline: true
                },
                {
                    name: '📺 Каналов',
                    value: `Всего ${client.channels.cache.size} каналов.`,
                    inline: true
                },
                {
                    name: '👥 Пользователей',
                    value: `всего ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '⏳ Пинг',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Дата входа',
                    value: client.user.createdAt,
                    inline: true
                }
            )
            .setFooter(`Команду заказал: ${message.author.tag}`, message.author.displayAvatarURL())

        await message.channel.send(embed)
    }
}