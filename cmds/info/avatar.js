module.exports = {
  name: "avatar",
  aliases: ["ava", "pfp", "ua"],
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  category: "Информация",
  description: "Выдает аватар участника сервера",
  usage: "c!avatar [участник]",
  run: async(client,message,args) => {
    let user;
      if (args[0]) {
        let member = message.guild.members.cache.get(args[0].replace(/[\\<>@!]/g,"")) || message.member
        user = member
      } else {
        user = message.member
      }
    let embed = {
      title: `Аватарка ${user.user.tag}`,
      image: {
        url: user.user.avatarURL({size:1024,format:"png",dynamic:true})},
      description: ` **[Ссылка](${user.user.avatarURL({size:2048,format:"png",dynamic:true})})**\nКартинка ниже`,
      color: cfg.color
    }
    message.reply({
      embeds: [embed]
    })
  }
}