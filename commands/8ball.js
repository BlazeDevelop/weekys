exports.run = async (client, message, args, color) => {
    let wishes = args.slice(0).join("");
    let author = message.author.username;

    function get8ball(wishes, author) {
        const ballRef = [
            "Это точно.",
            "Это решительно так.",
            "Без сомнения.",
            "Да, безусловно.",
            "Вы можете положиться на это.",
            "Насколько я понимаю, да.",
            "Наверняка.",
            "Прогноз хороший.",
            "Да.",
            "Знаки указывают на то, что да.",
            "Ответ туманный, попробуйте еще раз.",
            "Спросите еще раз позже.",
            "Лучше не говорить тебе сейчас.",
            "Не могу сейчас предсказать.",
            "Сконцентрируйся и попробуй еще раз.",
            "Не рассчитывай на это.",
            "Мой ответ - нет",
            "Мои источники говорят нет",
            "Прогноз не очень хороший.",
            "Очень сомнительно."
        ]
        let randomize = Math.floor(Math.random() * ballRef.length);
        if (!wishes) return args.missing(message, "Ask something, please.", client.commands.get('8ball').help)
        return `\:8ball\: | ${ballRef[randomize]} \*\*${author}\*\*`
    }
    message.channel.send(get8ball(wishes, author));
}
exports.conf = {
    aliases: ['8b'],
    cooldown: '5'
}
exports.help = {
    name: "8ball",
    description: "Tell to the mighty 8 Ball about your fortune.",
    usage: '8ball <questions>'
}