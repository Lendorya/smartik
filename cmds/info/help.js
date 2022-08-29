const {EmbedBuilder} = require("discord.js")
let a = []
module.exports = {
  name: "help",
  usage: "c!help [cmd]",
  description: "Выдает информацию о командах бота",
  category: "Информация",
  aliases: ["h"],
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async(client,message,args) => {
    if (!args[0]) {
    let a = []
const Discord = require("discord.js")
let embed = new EmbedBuilder()

embed.setColor(cfg.color)

embed.setThumbnail(message.guild.iconURL({format: "png", dynamic: true, size: 2048}))

embed.setFooter({text:"s.help \[команда\]"})

let cmdsya = new Map()
    let cmds = client.commands
    let cats = new Map()
    await cmds.forEach((value) => {
            cats.set(`${value.category}`, {cat:`${value.category}`})
    })

   async function findCmds(cate) {
     let cmd = []
     await cmds.forEach((c) => {
       if (c.category == cate) {
         if(cfg.blockedcmds.includes(c.name)) cmd.push(`\`${c.name} [Откл.]\``)
        else cmd.push(`\`${c.name}\``)
       } else return;
     })
     embed.addFields([{name:`${cate} \[${cmd.length}\]`, value:`${cmd.join(", ")}`}])
   }
    await cats.forEach(async(valuee) => {
if (valuee.cat == "Разработчик") return;
      if (valuee.cat == "NSFW" && message.channel.nsfw == false) return ;
        await findCmds(valuee.cat)
})
message.reply({embeds:[embed]})

    } else {
      let al;
      let cat;
      let us;
      let desc;
      let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
      let eembed = {
          title: "Ошибка",
          description: "Такой команды нет",
          color: "#8C52FF"
      }
      if(!command) {
        message.reply({embeds:[eembed]});
      } else {
        al = command.aliases
        if(!command.aliases || command.aliases.length == 0) al = "Псевдонимов нет"
        cat = command.category
        if(!command.category) cat = "Категории нет"
        desc = command.description
        if(!command.description) desc = "Информации нет"
        us = command.usage
        if(!command.usage) us = "?"
        let perm = command.perms
        let uperm; 
        if(perm.user.length == 0) uperm = ""
        else uperm = "| "+perm.user.join(", ") 
        let embed = {
          title: `Команда: ${args[0]}`,
          fields: [
            {
              name: "О команде",
              value: `\`\`\`${desc}\`\`\``
            },
            {
              name: "Категория",
              value: `\`\`\`${cat}\`\`\``,
              inline: true
            },
            {
              name: "Псевдонимы",
              value: `\`\`\`${al}\`\`\``,
              inline: true
            },
            {
              name: "Использование",
              value: `\`\`\`${us.replace("c!", "s.")}\`\`\``,
              inline: true
            },
            {
              name: "Нужные права боту | участнику",
              value: `\`\`\`${perm.client.join(", ")} ${uperm}\`\`\``
            }
          ],
          color: cfg.color
        }
        message.reply({embeds:[embed]})
      }
    }
  }
       }