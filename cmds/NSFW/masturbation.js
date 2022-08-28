module.exports = {
  name: "masturbation",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'masturbation'",
  usage: "s.masturbation",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.masturbation()
    let embed = {
      title: "Мастурбация",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "че???"}
    }
    message.reply({embeds: [embed]})
  }
}