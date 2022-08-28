module.exports = {
  name: "ass",
  aliases: [],
  category: "NSFW",
  description: "Выдает попку хехе",
  usage: "s.ass",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.ass()
    let embed = {
      title: "Дырачки))0)",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "есть пробитие"}
    }
    message.reply({embeds: [embed]})
  }
}