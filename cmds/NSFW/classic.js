module.exports = {
  name: "classic",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'classic'",
  usage: "s.classic",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.classic()
    let embed = {
      title: "Классическое",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "класик"}
    }
    message.reply({embeds: [embed]})
  }
}