module.exports = {
  name: "pantsu",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'pantsu'",
  usage: "s.pantsu",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.pantsu()
    let embed = {
      title: "трусяки",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "спрыгнут со скалы"}
    }
    message.reply({embeds: [embed]})
  }
}