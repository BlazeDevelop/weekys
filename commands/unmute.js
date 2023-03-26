const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unmute",
    description: "Use This To Unmute A Muted Person!",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Извините, У Вас Нет Прав На Размьют Кого-Либо!");
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Извините, Но У Меня Нет Прав На Размьют Кого-Либо!")

        }

        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send("Пожалуйста, Укажите Пользователя, Которого Мне Нужно Размьютить!")
        }
        if (user.id === message.author.id) {
            return message.channel.send("Вы Не Замьючены, Если Только Что Отправили Команду :)")
        }


        let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')


        if (user.roles.cache.has(muterole)) {
            return message.channel.send("Данный Пользователь Уже Размьючен!")
        } 

const embed = new MessageEmbed()
      .setAuthor(`Пользователь ${message.mentions.users.first().username} был размьючен`)
      .setFooter("Наслаждайся И Не Делай ничего, что заставит тебя Замьютить")
      .setColor("BLUE")

        user.roles.remove(muterole)
        await message.channel.send(embed)
        user.send(`Вы размьючены!`)








    }
}