const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',
    description: "Clears The Mentioned Number of Messages",
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
        if (message.author.id !== '825650500435312641') return message.channel.send("Вы не разработчик!");

        if (!args[0]) {
            return message.channel.send("Введите число!")
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;

        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setDescription(`Успешно удалено ${deleteAmount} Сообщений`)
            
            .setColor('#04E6FF')

        await message.channel.send(embed).then(message => message.delete({timeout: 5000}))

    }
}
