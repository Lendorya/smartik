module.exports = {
  name: "incest",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'incest'",
  usage: "s.incest",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.incest()
    let embed = {
      title: "Инцест",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "ФУ"}
    }
    message.reply({embeds: [embed]})
  }
}