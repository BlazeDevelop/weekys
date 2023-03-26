module.exports = {
    name: "mention",
    description: "Mutes The Mentioned User!",
    run: async (client, message, args) => {
 const sayMessage = args.join(" ");
  message.channel.send(client.users.find('username', sayMessage).toString());
    }
}
