const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed() 
      .setDescription("**Вы должны подключиться к голосовому каналу, прежде чем использовать эту команду!**") 
      .setColor("BLUE")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setDescription(":x: На этом сервере не воспроизводятся песни")
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Сейчас играет",
        "https://img.icons8.com/color/2x/audio-wave--v2.gif"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " Requested By: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("Есть " + queue.queue.length + " песен в очереди")
  );
};
