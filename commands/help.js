const { MessageEmbed } = require("discord.js");
const 	Discord = require('discord.js'),
		client = new Discord.Client(),
		disbut = require('discord-buttons');

disbut(client);

exports.run = async (client, message) => {
  const commands = `connect\`\` - присоединиться к голосовому каналу, в котором вы находитесь,
   disconnect\`\` - покинуть голосовой канал, в котором вы находитесь
   play <Название песни или юрл>\`\` - воспроизведение песен с YouTube
   pause\`\` - приостановка текущего воспроизведения песен на сервере
   resume\`\` - возобновить приостановленные песни на сервере
   queue\`\` - показывает очередь песен сервера
   skip\`\` - переход к следующей песне в очереди
   stop\`\` - останавливает песню и очищает очередь
   volume\`\` - просмотр или регулировка громкости песен
   np\`\` - смотрите сейчас воспроизводимую песню
   shuffle\`\` - перемешивание и рандомизация очереди
   invite\`\` - получить ссылку на приглашение для бота
   loop\`\` - включить / отключить цикл для текущей воспроизводимой песни
   removerole\`\` - Убрать роль у участника
   help\`\` - Помощь по командам
   ban\`\` - Забанить участника на сервере
   kick\`\` - Кикнуть участника на сервере
   forceban\`\` - Бан участника которого нет на сервере
   mute\`\` - мьют участника на сервере
   unmute\`\` - размьют участника на сервере
   info\`\` - Инфо о боте
   ping\`\` - Пинг бота
   test\`\` - Проверка работоспособности бота
   unban\`\` - Разбан участника
   addrole\`\` - Выдача роли участнику
   getinv\`\` - Выдача ссылки на сервер
   serverlist\`\` - Список серверов с названиями
   slowmode\`\` - Установка медленного режима
   avatar\`\` - показывает аватарку упомянутого пользователя
   setnick\`\` - Сменивает ник упомянутого пользователя
   bot-info\`\` - Показывает информацию о боте
   corona\`\` - Показывает информацию о короне
   server-info\`\` - Показывает информацию о сервере
   user-info\`\` - Показывает информацию о пользователе
   8ball\`\` - Магический шар
   add\`\` - Добавляет участника в тикет
   clear\`\` - Очищает указанное число сообщений
   close\`\` - Закрывает тикет
   delete\`\` - Удаляет тикет
   eval\`\` - Выполняет строку кода(для разработчиков)
   profile\`\` - Профиль участника
   transript\`\` - Запись тикета
   announce\`\` - Делает объявление в указанном канале`
  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "WeekysBot Commands Help",
        "https://img.icons8.com/color/2x/services--v2.gif"
      )
      .setColor("FFFBFB")
      .setTimestamp()
      .setDescription(revised)
  );
  const btn = new disbut.MessageButton()
				.setStyle('url')
				.setLabel(`Ссылка на сервер поддержки`)
				.setURL('https://discord.gg/bPfAzA9Nvp')
				.setDisabled(false); 
        message.channel.send(`Сервер поддержки`, { component: btn });
};
