const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mutes The Mentioned User!",
    run: async (client, message, args) => {


        if (!message.member.hasPermission("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Извините, У Вас Нет Прав На Мьют!");
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Извините, У Меня Нет Прав На Мьют")

        }

        const user = message.mentions.members.first()




        if (!user) {
            return message.channel.send("Пожалуйста, Укажите Пользователя, Которого Мне Нужно Замьютить!");
        }

        if (user.id === message.author.id) {
            return message.channel.send("Ха-Ха, Я Понимаю, Что Ты Пытаешься Здесь Сделать xD");
        }

        let reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send("Пожалуйста, Назовите Причину, Чтобы Замьютит Этого Человека!")
        }


        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

        if (!muterole) {
            return message.channel.send("У Этого Сервера Нет Роли `Muted`")
        }

        if (user.roles.cache.has(muterole)) {
            return message.channel.send("Данный Пользователь Уже Замьючен")
        }

        const embed = new MessageEmbed()
        .setAuthor(`${message.mentions.users.first().username} был замьючен | Причина - ${reason}`)
        .setColor("BLUE")
        



        try {
            user.roles.add(muterole)
        await message.channel.send(embed)
        user.send(`Вы замьючены в ${message.guild.name}`)
        } catch (error){
            console.log(error)
            message.channel.send("Убедитесь, что на Вашем сервере есть роль с именем `Muted` И установлены соответствующие разрешения!")
        }

    }

}
