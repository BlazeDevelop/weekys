module.exports = {
  name: "slowmode",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("Кажется, это не цифры..");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("Замедленный режим " + amount + " seconds");
        return;
      } else {
        message.channel.send("Замедленный режим " + amount + " second");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("Замедленный режим " + amount + " minutes");
        return;
      } else {
        message.channel.send("Замедленный режим " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("Замедленный режим " + amount + " hours");
        return;
      } else {
        message.channel.send("Замедленный режим " + amount + " hour");
        return;
      }
    } else {
      message.channel.send(
        "Вы можете установить только seconds(s), minutes(min) and hours(h)"
      );
    }
  }
};
