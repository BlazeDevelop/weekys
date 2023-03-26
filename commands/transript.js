const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	category: 'Ticket',
	description: 'Trascripts a specified ticket.',
	aliases: [],
	usage: 'transcript',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
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
							title: `Запись чата для ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('Ошибка! Повторите попытку позже!');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 Тык\`](${response.url})`)
						.setColor('GREEN');
					message.reply('Запись тикетов полная. Щелкните ссылку ниже, чтобы просмотреть стенограмму', embed);
				});
			}
		}
		else {
			return message.reply(
				'здесь нельзя использовать эту команду. Пожалуйста, используйте эту команду в открытом тикете.',
			);
		}
	},
};