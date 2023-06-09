const Discord = require("discord.js");
const ownerid = "825650500435312641";

module.exports = {
    name: "serverlist",
    aliases: ["slt"],
    description: "Displays the list of Servers!",
    usage: " ",

  run: async (bot, message, args) => {
    if (message.author.id == ownerid) {
      if (!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.channel
          .send("У меня нет прав")
          .then(msg => msg.delete({ timeout: 5000 }));

      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `Всего серверов - ${bot.guilds.cache.size}\n\n` +
        bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Участников\nID - ${r.id}`)
          .slice(0, 10)
          .join("\n\n");

      let embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL({dynamic : true}))
        
        .setColor("00FFFF")
        .setFooter(`Страница - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send(embed);

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Всего серверов - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Участников\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          embed
            .setFooter(
              `Страница - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          msg.edit(embed);
        }

        if (reaction._emoji.name === "➡") {
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;
e
          if (i1 > bot.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Всего серверов - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Участников\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          embed
            .setFooter(
              `Страница - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          msg.edit(embed);
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }

        await reaction.users.remove(message.author.id);
      });
    } else {
      return;
    }
  }
};