module.exports = {
  name: "ahegao",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'ahegao'",
  usage: "s.ahegao",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.ahegao()
    let embed = {
      title: "Ахегао",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
     image: {
        url: heImage
      },
      footer: {text: "ня"}
    }
    message.reply({embeds: [embed]})
  }
}