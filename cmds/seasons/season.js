module.exports = {
  name: "season",
  category: "Сезоны",
  description: "Выдает текущий сезон",
  usage: "c!season",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    message.embed(tr.seasonsTranslate[cfg.season])
  }
}