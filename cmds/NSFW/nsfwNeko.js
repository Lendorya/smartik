module.exports = {
  name: "neko-nsfw",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'nekoNsfw'",
  usage: "s.neko-nsfw",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.nsfwNeko()
    let embed = {
      title: "Неко но NSFW",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "?"}
    }
    message.reply({embeds: [embed]})
  }
}