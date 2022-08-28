module.exports = {
  name: "hentai",
  aliases: ["hent"],
  category: "NSFW",
  description: "Выдает хентай",
  usage: "s.hentai",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.hentai()
    let embed = {
      title: "Хентай",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "мм"}
    }
    message.reply({embeds: [embed]})
  }
}