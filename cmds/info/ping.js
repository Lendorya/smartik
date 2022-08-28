module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: "c!ping",
  description: "Выдает пинг бота и пинг Discord API",
  category: "Информация",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client,message,args) => {
    
    const embed = {
      title: "Понг!",
      fields: [
        {name:"Пинг бота", value:`\`\`\`${Date.now()-message.createdTimestamp}ms\`\`\``,inline:true},
        {name:"Пинг Discord API", value:`\`\`\`${client.ws.ping}ms\`\`\``,inline:true}
      ],
    color: cfg.color
    }
    message.reply({embeds:[embed]})
  }
  }