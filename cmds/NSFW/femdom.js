module.exports = {
  name: "femdom",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'femdom'",
  usage: "s.femdom",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.femdom()
    let embed = {
      title: "девушка доминирует",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "фу феменизм"}
    }
    message.reply({embeds: [embed]})
  }
}