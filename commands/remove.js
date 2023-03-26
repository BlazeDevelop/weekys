module.exports = {
	name: 'remove',
	category: 'Ticket',
	description: 'Removes a member to a specified ticket.',
	aliases: [],
	usage: 'remove <member>',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Неправильное использование! Правильное использование:remove <member>`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					message.channel.send(`Успешно удалён ${member} из ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('Произошла ошибка. Пожалуйста, попробуйте еще раз позже!');
			}
		}
	},
};