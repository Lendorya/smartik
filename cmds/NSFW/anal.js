module.exports = {
  name: "anal",
  aliases: [],
  category: "NSFW",
  description: "Выдает анальный sекс",
  usage: "s.anal",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.anal()
    let embed = {
      title: "Анал",
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