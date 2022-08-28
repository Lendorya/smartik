module.exports = {
  name: "footjob",
  aliases: ["fjob"],
  category: "NSFW",
  description: "Выдает рандомную картинку 'footjob'",
  usage: "s.footjob",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    if(message.channel.nsfw == false) return;
    const HMtai = require("hmtai");
    const hmtai = new HMtai();
    let heImage = await hmtai.nsfw.footjob()
    let embed = {
      title: "Работа ногами",
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