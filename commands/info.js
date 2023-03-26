const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: 'info',
    description: "Info in bot",
    run: async(client, message, args) => {
      const info = new Discord.MessageEmbed()
      .setColor('#06CBFF')
      .setTitle(`WeekysBot`)
      .setAuthor(message.author)
      .setDescription(`Привет меня зовут Weekys, у меня много прикольных команд.
Мой префикс - !, но в будущем я сделаю так чтобы можно было менять префикс!
Так же взгляни на команду help и тогда ты узнаешь много новых возможностей.

**Создан:              Разработчик бота:
12 августа              Снежок#1745**`)
      .setFooter(`WeekysBot © 2021 Все права защищенны`)  
      message.channel.send(info)
}
}
