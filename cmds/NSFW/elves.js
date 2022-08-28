module.exports = {
  name: "elves",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'elves'",
  usage: "s.elves",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.elves()
    let embed = {
      title: "Элвис",
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