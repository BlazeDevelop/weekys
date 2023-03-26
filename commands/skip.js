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
        .setDescription(":x: На этом сервере не воспроизводятся песни")
        .setColor("RED")
    );
  queue.connection.dispatcher.end('Песня скипнута');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Песня скипнута :white_check_mark: **")
      .setColor("BLUE")
  );
};
