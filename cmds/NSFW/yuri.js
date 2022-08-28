module.exports = {
  name: "yuri",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'yuri'",
  usage: "s.yuri",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.yuri()
    let embed = {
      title: "Лесбиянки, но в хентае",
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