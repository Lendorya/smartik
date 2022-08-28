const { Permissions } = require('discord.js');
module.exports = {
  name: "mute",
  category: "Модерация",
  description: "Кидает в таймаут участника с сервера",
  usage: "c!mute <участник> <время> [причина]",
  perms: {
    client:["EmbedLinks", "ModerateMembers"],
    user: ["ModerateMembers"]
  },
  run: async(client,message,args) => {
    if("A" == "A") {
        let user;
        let reason = args[2] || "не указана"
        if (args[0]) {
          let member = message.guild.members.cache.get(args[0].replace(/[\\<>@!]/g,"")) || "ошибка"
          user = member
          let userbot = message.guild.members.cache.get("982745857470386206")
          if (user == "ошибка") {
            let argsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Такой участник вообще есть на сервере?`,
            color: cfg.color
          }
          message.reply({
            embeds: [argsembed]
          })
          } else if (!args[1]) {
            let permsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Укажите время для мута (пример c!kick user 1ч.4м)`,
            color: cfg.color
          }
          message.reply({
            embeds: [permsembed]
          })
          } else if (user.user.id == message.member.user.id) {
            let argsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Зачем вам мутить себя?`,
            color: cfg.color
          }
          message.reply({
            embeds: [argsembed]
          })
          } else {
            try {
            if(user.user.id == message.guild.ownerId) {
              let embed = {
                author: {
                  name: "Ошибка",
                  icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                },
                description: `Я не могу замутить овнера`,
                color: cfg.color
              }
              message.reply({
                embeds: [embed]
              })
            } else if (user.user.id == client.user.id) {
              let embed = {
                author: {
                  name: "Ошибка",
                  icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                },
                description: `Я не могу замутить себя`,
                color: cfg.color
              }
              message.reply({
                embeds: [embed]
              })
            } else if ("a" == "a") {
              
              let d = args[1]
              let h;
              let m;
              d = d.split(".")
              
              if (d[0].includes("ч")) {
                m = 0
                if(d[0].length == 2) h = d[0][0]
                if(d[0].length == 3) h = d[0][0] + d[0][1]
                if(d[0].length > 3 || `${d[0][0] + d[0][1]}` > 24) h = "24"
              } else h = 1
              if (d[0].includes("м")) {
                h = 0
                if(d[0].length == 2) m = d[0][0]
                if(d[0].length == 3) m = d[0][0] + d[0][1]
                if(d[0].length > 3 || `${d[0][0] + d[0][1]}` > 60) m = "60"
              } else m = 1
              if(d[1]) {
              if (d[1].includes("м")) {
                if(d[1].length == 2) m = d[1][0]
                if(d[1].length == 3) m = d[1][0] + d[1][1]
                if(d[1].length > 3 || `${d[1][0] + d[1][1]}` > 60) m = "60"
              } else m = 1
              }
              
              if (isNaN(h) == true || isNaN(m) == true) {
                let permsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Время было указано неправильно (пример 1ч.4м)`,
            color: cfg.color
          }
          message.reply({
            embeds: [permsembed]
          })
              } else if (user.roles.highest.position < userbot.roles.highest.position) {
                

              let hims = h*60*60*1000
              let mims = m*60*1000
              let md = Date.now() + (hims + mims)
                let timestamp = md
let u = new Date(timestamp);
    timeStampCon = u.getDate() + '/' + (u.getMonth()+1) + '/' + u.getFullYear() + " " + (u.getHours()+3) + ':' + u.getMinutes(); 
              if (isNaN(hims) || isNaN(mims)) {
                let permsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Время было указано неправильно (пример 1ч.4м)`,
            color: cfg.color
          }
          message.reply({
            embeds: [permsembed]
          })
              } else {
              await user.timeout(mims+hims)
                    let embed = {
                    author: {
                      name: "Мут",
                      icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                    },
                    description: `Вы замутили ${user.user.tag} по причине \`${reason}\`, земля ему отдыхом\nВремя окончания мута <t:${Math.floor(user.communicationDisabledUntilTimestamp/1000)}> (<t:${Math.floor(user.communicationDisabledUntilTimestamp / 1000)}:R>)`,
                    color: cfg.color
                  }
                  message.reply({
                    embeds: [embed]
                  })
                }
              } else {
                   let embed = {
                author: {
                  name: "Ошибка",
                  icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                },
                description: `Я не могу замутить человека, у которого роль выше моей`,
                color: cfg.color
              }
              message.reply({
                embeds: [embed]
              })  
              }
              } else {
                
                let embed = {
                author: {
                  name: "Ошибка",
                  icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                },
                description: `Мне не удалось замутить данного участника\nПричины:\n\`\`\`1. Он создатель данного сервера\n2. У меня нет прав на мут  участников\n3. Моя роль ниже роли участника\n4. Неизвестная ошибка, обратитесь к создателю\`\`\``,
                color: cfg.color
              }
              message.reply({
                embeds: [embed]
              })
              }
            } catch(e) {
              let embed = {
                author: {
                  name: "Ошибка",
                  icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
                },
                description: `Мне не удалось кикнуть данного участника\nПричины:\n\`\`\`1. Он создатель данного сервера\n2. У меня нет прав на кик участников\n3. Моя роль ниже роли участника\n4. Неизвестная ошибка, обратитесь к создателю\`\`\``,
                color: cfg.color
              }
              message.reply({
                embeds: [embed]
              })
              console.log(e)
            }
          }
        } else {
          let argsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `Вы не указали кого надо кикнуть`,
            color: cfg.color
          }
          message.reply({
            embeds: [argsembed]
          })
        }
    } else {
      let permsembed = {
            author: {
              name: "Ошибка",
              icon_url: message.author.avatarURL({format: "png", size: 2048, dynamic: true})
            },
            description: `У вас нет прав (кикать участников)`,
            color: cfg.color
          }
          message.reply({
            embeds: [permsembed]
          })
    }
  }
            }