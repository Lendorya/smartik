const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "channel",
  aliases: ["ch", "channel-info"],
  usage: "c!channel [айди канала]",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  category: "Информация",
  description: "Выдает информацию о канале",
  run: async(client,message,args) => {
    let types = {
      0: "Текстовый",
      1: "Лс",
      2: "Голосовой", 
      3: "Группа",
      4: "Категория",
      5: "Новости",
      10: "Новости-Ветки",
      11: "Публичная ветка",
      12: "Приватная ветка",
      13: "Трибуна",
      14: "Хаб Серверов",
      15: "Форум"
    }
    let channel;
      if (args[0]) {
        let ch = message.guild.channels.cache.get(args[0].replace(/[\\<>#]/g,"")) || message.channel
        channel = ch
      } else {
        channel = message.channel
      }
    let embed = new EmbedBuilder()
    embed.setTitle("Информация о канале")
    embed.setDescription(`\`${channel.name} (${channel.id})\``)
    embed.addFields([{name:"Основная информация", value:`Создан: <t:${Math.floor(channel.createdTimestamp/1000)}>\nУчастников: **${channel.members.size}**\nТип: **${types[channel.type]}**\nПозиция: **${channel.rawPosition}**`}])
    embed.setColor(cfg.color)
    if (channel.type != "GUILD_CATEGORY") embed.addFields([{name:"Другое", value:`Идет от: **${channel.parent.name}** **(${channel.parent.id})**`}])


    if (channel.type != "GUILD_CATEGORY" && channel.topic) embed.addFields([{name:"Тема", value:`${channel.topic}`}])
    message.reply({embeds:[embed]})
  }
}