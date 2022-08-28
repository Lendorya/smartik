module.exports = {
  name: "cum",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'cum'",
  usage: "s.cum",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.cum()
    let embed = {
      title: "Cum (сперма)",
      description: `[Картинка внизу](${heImage})`,
      color: cfg.color,
      image: {
        url: heImage
      },
      footer: {text: "йогурт братека"}
    }
    message.reply({embeds: [embed]})
  }
}