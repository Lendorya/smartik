module.exports = {
  name: "cuckold",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'cuckold'",
  usage: "s.cuckold",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.cuckold()
    let embed = {
      title: "Куколд",
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