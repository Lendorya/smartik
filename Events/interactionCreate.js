const { EmbedBuilder } = require('discord.js');
module.exports = {
  event: 'interactionCreate',
  async run(bot, interaction) {
    if (!interaction.isCommand()) return;

    const command = bot.slash.get(interaction.commandName);
    if (!command) return;

    if (command.permission && !interaction.member.permissions.has(command.permission)) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(cfg.color)
            .setDescription(`test`)
        ]
      });
    } else {
        try {
          await command.run({ interaction, bot, options: interaction.options, guild: interaction.guild });
        } catch (err) {
          console.log(err);

          await interaction[interaction.deferred ? 'editReply' : interaction.replied ? 'followUp' : 'reply']({
            embeds: [new EmbedBuilder().setColor(cfg.color).setDescription(err.message || '?')]
          });
        }
      }
    }
  }