const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed() 
      .setDescription("**Вы должны подключиться к голосовому каналу, прежде чем использовать эту команду!**") 
      .setColor("BLUE")
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Ошибка Главного контроллера",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :x: В очереди на перетасовку нет песен**")
        .setColor("RED")
    );
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Мастер-контроллер рандомизации",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :white_check_mark: Перемешал очередь**")
        .setColor("BLUE")
    )
    .catch(console.error);
};
