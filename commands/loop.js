const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.channel.send(
      new MessageEmbed() 
      .setDescription("**:x: на этом сервере не проигрываются песни!**") 
      .setColor("BLUE")
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Настройка звука",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "**Повтор" +
          (queue.loop == true ? " Enabled " : " Disabled ") +
        "для текущей песни :white_check_mark: **"
      )
  );
};
