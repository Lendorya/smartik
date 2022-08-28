module.exports = {
  name: "handjob",
  aliases: ["hjob"],
  category: "NSFW",
  description: "Выдает рандомную картинку 'handjob'",
  usage: "s.handjob",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.handjob()
    let embed = {
      title: "Работа руками",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "дрочечка"}
    }
    message.reply({embeds: [embed]})
  }
}