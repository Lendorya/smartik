module.exports = {
  name: "glasses",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'glasses'",
  usage: "s.glasses",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.glasses()
    let embed = {
      title: "Очки",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "ачкарики тоже кутые"}
    }
    message.reply({embeds: [embed]})
  }
}