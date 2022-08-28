module.exports = {
  name: "manga",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'manga'",
  usage: "s.manga",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.manga()
    let embed = {
      title: "Манга",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "манга"}
    }
    message.reply({embeds: [embed]})
  }
}