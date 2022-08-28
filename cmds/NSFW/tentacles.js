module.exports = {
  name: "tentacles",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'tentacles'",
  usage: "s.tentacles",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.tentacles()
    let embed = {
      title: "Тентакли",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "фу"}
    }
    message.reply({embeds: [embed]})
  }
}