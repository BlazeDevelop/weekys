const Discord = require('discord.js');

exports.run = (client, message, args, con) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`У вас нет разрешения на использование этой команды.`).catch(e => {});
    
          var thechannel;
          const filter = m => m.author.id === message.author.id;
    
          const starter = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`**СОЗДАНИЕ ЕМБЕДА НАЧАТО!**\nВведите \`end\` отменить создание.`)
    
          const builder0 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **канал** чтобы вставить этот эмбед.`)
    
          const builder1 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **автора**.\nНапишите \`na\` чтобы пропустить этот шаг.`)
    
          const builder2 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **цвет**.\nНапишите \`na\` чтобы пропустить этот шаг.`)
    
          const builder3 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **название**.\nType \`na\` чтобы пропустить этот шаг.`)
    
          const builder4 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **ссылка на уменьшенное изображение**.\nType \`na\` чтобы пропустить этот шаг.`)
    
          const builder5 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **описание**.\nType \`na\` чтобы пропустить этот шаг.`)
    
          const builder6 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **ссылку на изображение**.\nType \`na\` чтобы пропустить этот шаг.`)
    
          const builder7 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`Пожалуйста, напишите **нижний колонтитул**.\nType \`na\` чтобы пропустить этот шаг.`)
    
          const finish1 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`**Эмбед загружается...**`)
    
          const finish2 = new Discord.MessageEmbed()
          .setColor(`${client.config.colorhex}`)
          .setDescription(`**Эмбед размещен!**`)
    
          message.channel.send(starter).catch(e => {});
    
          message.channel.send(builder0).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
            .then(collected => {
                let content0l = collected.first().content.toLowerCase()
                let content0 = collected.first().content
    
                if(content0l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
    
                if(collected.first().mentions.channels.first()) {
                  thechannel = collected.first().mentions.channels.first().id
                } else if(!isNaN(collected.first().content)) {
                  thechannel = collected.first().content
                }
    
                if(thechannel == undefined) return message.channel.send(`Процесс создания эмбеда отменен, мне не удалось найти указанный канал.`);
    
                message.channel.send(builder1).then(() => {
                  message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                  .then(collected => {
                      let content1l = collected.first().content.toLowerCase()
                      let content1 = collected.first().content
          
                      if(content1l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
          
                      message.channel.send(builder2).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                        .then(collected => {
                            let content2l = collected.first().content.toLowerCase()
                            let content2 = collected.first().content
                
                            if(content2l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                
                            message.channel.send(builder3).then(() => {
                              message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                              .then(collected => {
                                  let content3l = collected.first().content.toLowerCase()
                                  let content3 = collected.first().content
                      
                                  if(content3l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                      
                                  message.channel.send(builder4).then(() => {
                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                    .then(collected => {
                                        let content4l = collected.first().content.toLowerCase()
                                        let content4 = collected.first().content
                            
                                        if(content4l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                            
                                        message.channel.send(builder5).then(() => {
                                          message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                          .then(collected => {
                                              let content5l = collected.first().content.toLowerCase()
                                              let content5 = collected.first().content
                                  
                                              if(content5l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                                  
                                              message.channel.send(builder6).then(() => {
                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                .then(collected => {
                                                    let content6l = collected.first().content.toLowerCase()
                                                    let content6 = collected.first().content
                                        
                                                    if(content6l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                                        
                                                    message.channel.send(builder7).then(() => {
                                                      message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                      .then(collected => {
                                                          let content7l = collected.first().content.toLowerCase()
                                                          let content7 = collected.first().content
                                              
                                                          if(content7l === 'end') return message.channel.send(`**Создание эмбеда отменен!**`).catch(e => {});
                                              
                                                          message.channel.send(finish1).catch(e => {});
                                                          embedBuilder(Discord, client, thechannel, message, content1, content2, content3, content4, content5, content6, content7)
                                                          setTimeout(() => {
                                                            message.channel.send(finish2)
                                                          }, 3000)
                                              
                                                      }).catch(e => {});
                                                    }).catch(e => {});
                                        
                                                }).catch(e => {});
                                              }).catch(e => {});
                                  
                                          }).catch(e => {});
                                        }).catch(e => {});
                            
                                    }).catch(e => {});
                                  }).catch(e => {});
                      
                              }).catch(e => {});
                            }).catch(e => {});
                
                        }).catch(e => {});
                      }).catch(e => {});
          
                  }).catch(e => {});
                }).catch(e => {});
    
            }).catch(e => {});
          }).catch(e => {});
    
    async function embedBuilder(Discord, client, thechannel, message, content1, content2, content3, content4, content5, content6, content7) {
    
      var chan;
    
      try {
        chan = await client.channels.cache.get(thechannel)
      } catch(e) {
        console.log(e)
      }
        if(chan == undefined) return message.channel.send(`Предоставленный канал недействителен...`);
    
        const finalizer = new Discord.MessageEmbed()
    
        if(content1 != 'na') {
          try { finalizer.setAuthor(content1) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении автора.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content2 != 'na') {
          try { finalizer.setColor(content2) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении цвета.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content3 != 'na') {
          try { finalizer.setTitle(content3) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении заголовка.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content4 != 'na') {
          try { finalizer.setThumbnail(content4) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении миниатюры.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content5 != 'na') {
          try { finalizer.setDescription(content5) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении описания.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content6 != 'na') {
          try { finalizer.setImage(content6) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении изображения.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
        if(content7 != 'na') {
          try { finalizer.setFooter(content7) } catch(e) { if(e) return message.channel.send(`Что-то пошло *не так* при добавлении нижнего колонтитула.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
        }
    
        try {
          await chan.send(finalizer).catch(e => { console.log(e) });
        } catch(e) {
          if(client.config.debugmode) return console.log(e)
        }
    
    }
    
    

}
