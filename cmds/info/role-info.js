const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "role-info",
  aliases: ["ri", "role"],
  usage: "c!role-info <айди>",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  category: "Информация",
  description: "Выдает информацию о канале",
  run: async(client,message,args) => {

    let roles;
      if (args[0]) {
        let ch = message.guild.roles.cache.get(args[0].replace(/[\\<&@>]/g,"")) || "?"
        roles = ch
        if(roles != "?") {
          let cl;
          let color = (async() => {
            if(roles.color == 0) cl = "Основной"
            else cl = roles.hexColor
            return cl
          })

          let members = roles.members.map(a => a.user.tag)
          let getMembers = (async() => {
            let membersValue = 0
            let mem = 0
            let newMembers = []
            members.forEach(a => {
              if(membersValue < 11 && members.size <= 10) {
                membersValue++
                newMembers.push(a)
                mem ++
              } else if(membersValue < 11 && members.size > 10) {
                membersValue++
                mem++
                if (membersValue < 11) {
                  newMembers.push(a)
                } else return;
              } else {
                membersValue++
                mem++
                if (membersValue < 11) {
                  newMembers.push(a)
                } else return;
              }
            })
            if (members.length == 0) return "Пусто"
            else if(membersValue <= 10) return `\`\`\`${newMembers.join(", ")}\`\`\``
            else if(membersValue > 10) return `\`\`\`${newMembers.join(", ")} ... и еще ${mem} участников\`\`\``
            else return `\`\`\`${newMembers.join(", ")} ... и еще ${mem} участников\`\`\``
          })
          let embed = new EmbedBuilder()
          
          embed.setTitle("Информация о роли")
          embed.setDescription(`\`${roles.name} (${roles.id})\``)
          embed.setFields([
            {
              name: "Основное",
              value: `Цвет: **${await color()}**\nСоздана: <t:${Math.floor(roles.createdTimestamp / 1000)}>\n`
            },
            {
              name: "Участники с ролью",
              value: `${await getMembers()}`
            }
          ])
          message.reply({embeds:[embed]})
        } else {
          message.fail("Укажите роль по айди или пинганите её\n\n**Пример немного ниже**", "https://cdn.discordapp.com/attachments/1010986998183510087/1013730597690167376/unknown.png")
        }
      } else {
        message.fail("Укажите роль по айди или пинганите её\n\n**Пример немного ниже**", "https://cdn.discordapp.com/attachments/1010986998183510087/1013730597690167376/unknown.png")
      }
    
  }
}