const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed() 
      .setDescription("**Вы должны подключиться к голосовому каналу, прежде чем использовать эту команду!**") 
      .setColor("BLUE")
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("У меня нет разрешения на подключение к голосовому каналу");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("У меня нет разрешения говорить по голосовому каналу");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Подключился к голосовому каналу :white_check_mark: **")
      .setColor("BLUE")
  );
};
