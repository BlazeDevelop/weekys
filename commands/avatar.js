const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: "Get a user's/your Avatar",
    run: async(client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        const avatar = member.displayAvatarURL({ dynamic: true, size: 1024 })

        const embed = new MessageEmbed()
        .setTitle(`${member.tag}\'Аватарка`)
        .setImage(avatar)

        message.channel.send(embed)
    }
}