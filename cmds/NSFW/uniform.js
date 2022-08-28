module.exports = {
  name: "uniform",
  aliases: [],
  category: "NSFW",
  description: "Выдает рандомную картинку 'uniform'",
  usage: "s.uniform",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.uniform()
    let embed = {
      title: "Униформа",
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