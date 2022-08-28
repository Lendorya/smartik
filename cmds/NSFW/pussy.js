module.exports = {
  name: "pussy",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'pussy'",
  usage: "s.pussy",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.pussy()
    let embed = {
      title: "Дырачки))0)",
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