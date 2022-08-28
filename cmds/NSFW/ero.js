module.exports = {
  name: "ero",
  aliases: ["erotic"],
  category: "NSFW",
  description: "Выдает рандомную картинку 'ero'",
  usage: "s.ero",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.ero()
    let embed = {
      title: "Эро",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "btw"}
    }
    message.reply({embeds: [embed]})
  }
}