const { PermissionsBitField } = require('discord.js');
const { error } = require('../Classes/Utils.js');
const { logger } = require("consola")
module.exports = {
  event: "messageCreate",
  run: async(client,message) => {
    // SendMessages
          
    try {
      let prefix = "s."
      if (message.author.bot) return;
      if (!message.guild) return;
      if (!message.content.startsWith(prefix)) return;
  
      if (!message.member) message.member = await message.guild.fetchMember(message);
  
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      
      if (cmd.length === 0) return;
      
      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      try {
        if (command) {
          let tf = []
          let pr = command.perms.client
          let npr = []
          await pr.forEach(value => {
            tf.push(message.guild.members.me.permissions.has(PermissionsBitField.Flags[value]))
              if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags[value])) npr.push(value)
              
          })
          let utf = []
          let upr = command.perms.user
          let unpr = []
          let nsfw = command.nsfw || "false"
          if(upr.length > 0) {
            await upr.forEach(value => {
              utf.push(message.member.permissions.has(PermissionsBitField.Flags[value]))
                if(!message.member.permissions.has(PermissionsBitField.Flags[value])) unpr.push(value)
                
            })
          } utf.push(true)
          if(cfg.blockedcmds.includes(command.name) && !cfg.devs.includes(message.author.id)) return message.fail("Данная команда сейчас доступна только разработчику")
            
else if (cfg.blacklist.includes(message.author.id)) {
  if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags["EmbedLinks"])) {
    message.reply({content: "Вы находитесь в черном списке бота"})
  } else {
    message.fail("Извините, но вы находитесь в черном списке бота\nЕсли вы хотите оспорить это или подать аппеляцию напишите создателю бота")
  }
}  
          else if ( nsfw == "true" ) {
            if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags["EmbedLinks"])) {
              message.reply("Извини, но данная команда имеет метку NSFW")
            } else {
              message.fail("Извини, но данная команда имеет метку NSFW")
            }
          } else if (tf.includes(false)) {
            if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags["EmbedLinks"])) { 
              message.reply({
              content: `Для начала выдайте мне эти права чтобы я мог нормально исполнить данную команду:\n\`\`\`${npr.join(", ")}\`\`\``
                })
            } else {
              message.fail(`Для начала выдайте мне эти права чтобы я мог нормально исполнить данную команду:\n\`\`\`${npr.join(", ")}\`\`\``)
            }
          } else if(utf.includes(false)) {
            if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags["EmbedLinks"])) { 
              message.reply({
              content: `Вам недостаточно этих прав чтобы выполнить данную команду:\n\`\`\`${unpr.join(", ")}\`\`\``
                })
            } else {
              message.fail(`Вам недостаточно этих прав чтобы выполнить данную команду:\n\`\`\`${unpr.join(", ")}\`\`\``)
            }
          } else await command.run(client, message, args);
        }
      } catch(e) {

        try {
          await error(e, message)
        } catch (e) {
          logger.error(e)
        }
        
      }
  } catch (e) {
        try {
          await error(e, message)
        } catch (e) {
          logger.error(e)
        }
    }
  }
}
