"use strict"

const { Message, EmbedBuilder, MessagePayload, TextChannel } = require("discord.js");
const consola = require("consola")

  Message.prototype.fail = function(args) {
      let embed = {
        author: {
          name: this.author.tag,
          icon_url: this.author.avatarURL({dynamic: true, size: 2048, type: "png"})
        },
        description: args,
        color: cfg.color
      }
      this.reply({embeds:[embed]});
  }

  Message.prototype.embed = function(args) {
      let embed = {
        author: {
          name: this.author.tag,
          icon_url: this.author.avatarURL({dynamic: true, size: 2048, type: "png"})
        },
        description: args,
        color: cfg.color
      }
      this.reply({embeds:[embed]});
  }

  Message.prototype.reply = async function(options) {
    let data;
  
      if (options instanceof MessagePayload) {
        data = options;
      } else {
        data = MessagePayload.create(this, options, {
          reply: {
            messageReference: this,
            failIfNotExists: options?.failIfNotExists ?? this.client.options.failIfNotExists,
          },
        });
      }
    try {
        return await this.channel.send(data);
    } catch(e) {
        return consola.error(`Ошибка на сервере ${this.guild.name} по причине ${e}`)
    }
  }
