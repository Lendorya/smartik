module.exports = {
  name: "thighs",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'thighs'",
  usage: "s.thighs",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.thighs()
    let embed = {
      title: "бедра хы)",
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