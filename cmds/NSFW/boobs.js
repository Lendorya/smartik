module.exports = {
  name: "boobs",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'boobs'",
  usage: "s.boobs",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.boobs()
    let embed = {
      title: "Сисячки",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "иногда фу"}
    }
    message.reply({embeds: [embed]})
  }
}