const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: "Выдает пинг бота, понг",
  category: 'Инфо',
  async run({ interaction, bot }) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(cfg.color)
          .addFields({name:'Апи', value:`${Math.round(bot.ws.ping)} ms`})
          .addFields({name:'Бот', value:`${Date.now() - interaction.createdTimestamp}`})
          .addFields({name:'Аптайм', value:`<t:${(Date.now() / 1000 - bot.uptime / 1000).toFixed(0)}:R>`})
      ]
    });
  }
};