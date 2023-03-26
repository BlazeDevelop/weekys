const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js");
const forHumans = require("../utils/forhumans.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;

  const error = (err) => message.channel.send(err);
  const send = (content) => message.channel.send(content);
  const setqueue = (id, obj) => message.client.queue.set(id, obj);
  const deletequeue = (id) => message.client.queue.delete(id);
  var song;

  if (!channel) return error("Вы должны подключиться к голосовому каналу, чтобы воспроизводить музыку!");

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("У меня нет разрешения на подключение к голосовому каналу");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("У меня нет разрешения говорить по голосовому каналу");

  const query = args.join(" ");

  if (!query) return error("Вы не указали название песни для воспроизведения!");

  if (query.includes("www.youtube.com")) {
    try {
      const ytdata = await await yt.getBasicInfo(query);
      if (!ytdata) return error("Песня не найдена для указанного URL-адреса");
      song = {
        name: Util.escapeMarkdown(ytdata.videoDetails.title),
        thumbnail:
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
        requested: message.author,
        videoId: ytdata.videoDetails.videoId,
        duration: forHumans(ytdata.videoDetails.lengthSeconds),
        url: ytdata.videoDetails.video_url,
        views: ytdata.videoDetails.viewCount,
      };
    } catch (e) {
      console.log(e);
      return error("Произошла ошибка, пожалуйста, проверьте консоль");
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return error("Я не смог найти песню, которую вы просили!'");
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return error("Произошла ошибка, пожалуйста, проверьте консоль");
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "Песня добавлена ​​в очередь",
          "https://img.icons8.com/color/2x/cd--v3.gif"
        )
        .setColor("F93CCA")
        .setThumbnail(song.thumbnail)
        .addField("Название песни", song.name, false)
        .addField("Просмотры", song.views, false)
        .addField("Длительность", song.duration, false)
        .addField("Запрошено", song.requested.tag, false)
        .setFooter("Музыкальный плеер Youtube" + list.queue.length + " In the queue")
    );
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 85,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return error("Мне не удалось подключиться к голосовому каналу. Проверьте консоль!");
  }

  async function play(track) {
    try {
      const data = message.client.queue.get(message.guild.id);
      if (!track) {
        data.channel.send("Очередь пуста, выход из голосового канала");
        message.guild.me.voice.channel.leave();
        return deletequeue(message.guild.id);
      }
      data.connection.on("отсоеденение", () => deletequeue(message.guild.id));
      const source = await ytdl(track.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        opusEncoded: true,
      });
      const player = data.connection
        .play(source, { type: "opus" })
        .on("finish", () => {
          var removed = data.queue.shift();
          if(data.loop == true){
            data.queue.push(removed)
          }
          play(data.queue[0]);
        });
      player.setVolumeLogarithmic(data.volume / 100);
      data.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Начать играть",
            "https://img.icons8.com/color/2x/cd--v3.gif"
          )
          .setColor("9D5CFF")
          .setThumbnail(track.thumbnail)
          .addField("Название песни", track.name, false)
          .addField("Просмотры", track.views, false)
          .addField("Длительность", track.duration, false)
          .addField("Запрошено", track.requested, false)
          .setFooter("Очередь пуста, выход из голосового канала")
      );
    } catch (e) {
      console.error(e);
    }
  }
};
