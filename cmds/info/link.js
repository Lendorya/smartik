module.exports = {
  name: "link",
  usage: "c!link",
  description: "Выдает ссылки на бота и гитхаб",
  category: "Информация",
  aliases: ["l", "invites", "invite"],
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async(client,message,args) => {
    let embed = {
      author: {
        name: "Ссылочки",
        icon_url: "https://cdn.discordapp.com/avatars/982745857470386206/088a261eda6668b43651cfdf8cd0fb61.png",
        url: "https://lendry.ml/"
      },
      description: "**[Тык](https://lendry.ml/)**",
      color: cfg.color
    }
    message.reply({embeds:[embed]})
  }
}