module.exports = {
  name: "boobjob",
  aliases: ["bbjob"],
  category: "NSFW",
  description: "Выдает рандомную картинку 'boobjob'",
  usage: "s.boobjob",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.boobjob()
    let embed = {
      title: "Работа сисечками",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "мм"}
    }
    message.reply({embeds: [embed]})
  }
}