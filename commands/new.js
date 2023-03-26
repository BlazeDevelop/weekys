module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	aliases: [],
	usage: 'new',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('у вас уже есть тикет, пожалуйста, закройте существующий, прежде чем открывать новый!');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			message.reply(`вы успешно создали тикет! Пожалуйста, нажмите на ${channel}, чтобы просмотреть свой билет.`);
			channel.send(`Привет ${message.author}, добро пожаловать в ваш билет! Пожалуйста, проявите терпение, мы скоро будем с вами. Если вы хотите закрыть этот тикет, введите \`close\``);
			const logchannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');
			if(logchannel) {
				logchannel.send(`Тикет ${message.author.id} Создан. Щелкните следующее, чтобы просмотреть <#${channel.id}>`);
			}
		});
	},
};
