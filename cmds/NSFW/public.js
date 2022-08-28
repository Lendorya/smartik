module.exports = {
  name: "public",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'public'",
  usage: "s.public",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.public()
    let embed = {
      title: "Публичное",
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