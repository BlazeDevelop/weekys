const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close',
	description: 'Closes the ticket.',
	aliases: [],
	usage: 'close',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('ru-ru')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Запись чата для ${message.channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('Произошла ошибка. Пожалуйста, попробуйте еще раз!');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 Тык\`](${response.url})`)
						.setColor('RANDOM');
					member.send('Вот запись вашего тикета, пожалуйста, нажмите на ссылку ниже, чтобы просмотреть запись', embed);
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Успешно закрыт ${message.channel}`);
						});
					}
					catch(e) {
						return message.channel.send('Произошла ошибка. Пожалуйста, попробуйте еще раз!');
					}
				});
			}
		}
		else {
			return message.reply('здесь нельзя использовать эту команду. Используйте эту команду, когда закрываете тикет.');
		}
	},
};