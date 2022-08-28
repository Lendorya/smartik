module.exports = {
  name: "bdsm",
  aliases: [],
  category: "NSFW",
  description: "Выдает БДСМ",
  usage: "s.bdsm",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.bdsm()
    let embed = {
      title: "БДСМ",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "быстрый десерт с маслом"}
    }
    message.reply({embeds: [embed]})
  }
}