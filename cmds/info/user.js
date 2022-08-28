let status = {online: 'В сети',idle: 'Нет на месте',dnd: 'Не беспокоить',offline: 'Не в сети'}
const strftime = require("strftime")
module.exports = {
  name: "user",
  aliases: ["ui", "u"],
  category: "Информация",
  description: "Выдает информацию о участнике",
  usage: "c!user \[user\]",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    
    try {
      let user;
      if (args[0]) {
        let member = message.guild.members.cache.get(args[0].replace(/[\\<>@!]/g,"")) || message.member
        user = member
      } else {
        user = message.member
      }
      let avatar = user.user.avatarURL({size: 2048, dynamic: true})
      let time;
    
      let em;
      let stat;
      let st;
      let a;
      let game;
      let nick;
      if (!user.nickname) nick = ""
      else nick = `(${user.nickname})`
      if (!user.communicationDisabledUntilTimestamp || user.communicationDisabledUntilTimestamp < Date.now()) time = " "
      else time = `\n**В Таймауте:** до <t:${Math.floor(user.communicationDisabledUntilTimestamp / 1000)}> (<t:${Math.floor(user.communicationDisabledUntilTimestamp / 1000)}:R>)`
      if (!user.presence) {
        st = "Отсутствует"
        game = "Не в сети"
      } else {
        if (user.presence.activities[0] == "Custom Status") {
          if (!user.presence.activities[0].emoji) em = ""
          else em = user.presence.activities[0].emoji
          if (!user.presence.activities[0].state) stat = ""
          else stat = user.presence.activities[0].state
          st = `${em} ${stat}`
        } else {
          st = "Отсутствует"
        }
        if (user.presence.activities[0] == "Custom Status") a = 1
        else a = 0
        if (!user.bot) {
          if (!user.presence.activities[a]) game = `${status[user.presence.status]}`
          else if (user.presence.activities[a].type == 'PLAYING') game = `Играет в ${user.presence.activities[0].name}`
          else if (user.presence.activities[a].type == 'STREAMING') game = `Стримит [${user.presence.activities[a].name}](${user.presence.activities[a].url})`
          else if (user.presence.activities[a].type == 'LISTENING') game = `Слушает **${user.presence.activities[a].name}**\n:headphones: ${user.presence.activities[a].state} - ${user.presence.activities[a].details}`
          else if (user.presence.activities[a].type == 'WATCHING') game = `Смотрит **${user.presence.activities[a].name}\n${user.presence.activities[a].state} - ${user.presence.activities[a].details}**`
          else if (user.presence.activities[a]) game = `${status[user.presence.status]}`
        } else {
          if (!user.presence.activities[a]) game = `${status[user.presence.status]}`
          else if (user.presence.activities[a].type == 'PLAYING') game = `Играет в ${user.presence.activities[0].name}`
          else if (user.presence.activities[a].type == 'STREAMING') game = `Стримит [${user.presence.activities[0].name}](${user.presence.activities[0].url})`
          else if (user.presence.activities[a].type == 'LISTENING') game = `Слушает **${user.presence.activities[0].name}**`
          else if (user.presence.activities[a].type == 'WATCHING') game = `Смотрит **${user.presence.activities[0].name}**`
          else if (user.presence.activities[a]) game = `${status[user.presence.status]}`
        }
      }
      let bot = {
          "true": "да",
          "false": "нет"
      }

      let day = 1000 * 60 * 60 * 24
      let date1 = new Date(message.createdTimestamp)
      let date2 = new Date(user.user.createdTimestamp)
      let date3 = new Date(user.joinedTimestamp)
      let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
      let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))
let zna;
      if (cfg.znachki[user.user.id]) zna = cfg.znachki[user.user.id]["zn"].join(" ")
     else zna = "отсутствуют"

      
      let embed = {
        author: {
          name: "Юзеринфо",
          icon_url: avatar,
          url: `https://discord.com/users/${user.id}`
        },
        description: `**Юзер:** ${user.user.tag} ${nick}`,
        color: cfg.color,
        thumbnail: { url: avatar },
        fields: [
          {name: 'Основное', value: `**Бот:** ${bot[user.user.bot]}\n**Cтатус:** ${game}\n**Кастом статус:** ${st}${time}\n**Значки (в боте):** ${zna}`},
          {name: 'Даты', value: `**Дата регистрации:** ${strftime('%d.%m.%Y в %H:%M:%S', new Date(user.user.createdTimestamp))} (${diff1} дн. назад)\n**Дата вступления:** ${strftime('%d.%m.%Y в %H:%M:%S', new Date(user.joinedTimestamp))} (${diff2} дн. назад)`},
          {
            name: "Роли",
            value: user.roles.cache.map(role => role).join(', ').replace(", @everyone", " ")
          }
        ],
        footer: {
          text: `ID: ${user.id}`
        }
      }
      message.reply({embeds: [embed]})
    } catch(e) {
      message.reply(`${e.name}: ${e.message}`)
    }
  }
                           }