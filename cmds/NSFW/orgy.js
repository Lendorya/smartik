module.exports = {
  name: "orgy",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'orgy'",
  usage: "s.orgy",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.orgy()
    let embed = {
      title: "Оргия",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "массавое"}
    }
    message.reply({embeds: [embed]})
  }
}