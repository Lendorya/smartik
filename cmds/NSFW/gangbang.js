module.exports = {
  name: "gangbang",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'gangbang'",
  usage: "s.gangbang",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.gangbang()
    let embed = {
      title: "Гэнгбэнг",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "иногда фуфу"}
    }
    message.reply({embeds: [embed]})
  }
}