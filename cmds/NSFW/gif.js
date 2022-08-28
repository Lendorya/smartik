module.exports = {
  name: "gif",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'gif'",
  usage: "s.gif",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.gif()
    let embed = {
      title: "Гифка",
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