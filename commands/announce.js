const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    description: "Используйте эту команду, чтобы сообщать о важных вещах.",
    usage: "<название канала><сообщение><-ping>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('У вас нет разрешения на использование этой команды');

        let mention;

        if(!args.length) return message.channel.send('Использование: announce <#канал> <сообщение> <-ping>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Укажите канал!');

        if(!args[1]) return message.reply('Укажите сообщение для объявления');

        // mentions
        if(args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++ ) {
                if(args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('@everyone');

        channel.send(
            new MessageEmbed()
                .setTitle('**__Объявление!__**')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )


    }
}
