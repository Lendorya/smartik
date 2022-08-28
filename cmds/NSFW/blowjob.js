module.exports = {
  name: "blowjob",
  aliases: ["bjob"],
  category: "NSFW",
  description: "Выдает рандомную картинку 'blowjob'",
  usage: "s.blowjob",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.blowjob()
    let embed = {
      title: "Работа ртом (губами)",
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