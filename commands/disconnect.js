const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed() 
      .setDescription("**Вы должны подключиться к голосовому каналу, прежде чем использовать эту команду!**") 
      .setColor("BLUE")
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Покинул голосовой канал :white_check_mark: **")
      .setColor("BLUE")
  );
};
