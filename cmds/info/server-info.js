module.exports = {
  name: "server-info",
  aliases: ["server"],
  usage: "c!server-info",
  category: "Информация",
  description: "Выдает информацию о сервере",
  perms: {
    client:["EmbedLinks"],
    user: []
  },
  run: async (client, message, args) => {
    
    let GUILD_MEMBERS = await message.guild.members.fetch({ withPresences: true })
    
    let onlineMembers = {
     onl: await GUILD_MEMBERS.filter((online) => online.presence?.status === "online").size,
     idl: await GUILD_MEMBERS.filter((online) => online.presence?.status === "idle").size,
     dnd: await GUILD_MEMBERS.filter((online) => online.presence?.status === "dnd").size
    }
    let fRu = []
    let verificationLevels = {
      0: "Отсутствует",
      1: "Низкий",
      2: "Средний",
      3: "Высокий",
      4: "Очень Высокий"
    }
    let guildData = {
      name: message.guild.name,
      id: message.guild.id,
      owner: `<@${message.guild.ownerId}>`,
      features: message.guild.features,
      members: {
        online: (onlineMembers.onl + onlineMembers.idl + onlineMembers.dnd),
        offline: (message.guild.members.cache.size - (onlineMembers.onl + onlineMembers.idl + onlineMembers.dnd)),
        bots: message.guild.members.cache.filter((u) => u.user.bot === true).size,
        all: {
          allMembers: (message.guild.members.cache.size - message.guild.members.cache.filter((u) => u.user.bot === true).size),
          allMembersBots: message.guild.members.cache.size
        }
      },
      icon: message.guild.iconURL({format: "png", dynamic: true, size: 2048}),
      channels: {
        text: (message.guild.channels.cache.filter((c) => c.type === 0).size + message.guild.channels.cache.filter((c) => c.type === 5).size),
        voice: message.guild.channels.cache.filter((c) => c.type === 2).size,
        category: message.guild.channels.cache.filter((c) => c.type === 4).size,
        allChannels: message.guild.channels.cache.size
      },
      stats: {
        verificationLvl: verificationLevels[message.guild.verificationLevel],
        roles: message.guild.roles.cache.size,
        emojis: message.guild.emojis.cache.size,
        dates: {
          create: message.guild.createdTimestamp,
          join: message.member.joinedTimestamp
        }
      }
    }
      const f = message.guild.features
      let ruFe = []
      let ruuFe = []
      f.forEach((a) => {
        ruFe.push(tr.featuresTranslate[a])
      })
      ruFe.forEach((b) => {
        if(!b) return;
        ruuFe.push(b)
      })
    let embed = {
      title: "Информация о сервере",
      description: `\`${guildData.name} (${guildData.id})\``,
      thumbnail: {
        url: guildData.icon 
      },
      fields: [
        {
          name: "Основная информация",
          value: `Владелец: ${guildData.owner}\nУровень верификации: **${guildData.stats.verificationLvl}**\nОсобенности: \`${ruuFe.join(", ")}\`\nДата создания: <t:${Math.floor(guildData.stats.dates.create/1000)}>\nВы вошли: <t:${Math.floor(guildData.stats.dates.join/1000)}>`
        },
        {
          name: `Участники [${guildData.members.all.allMembersBots}]`,
          value: `<:user_aue:817840607087165451> Пользователей: **${guildData.members.all.allMembers}**\n<:online:754338628871913543> В сети: **${guildData.members.online}**\n<:offline:754338708865679463> Не в сети: **${guildData.members.offline}**\n<:bot:1009086899765399622> Ботов: **${guildData.members.bots}**`,
          inline: true
        },
        {
          name: `Каналы [${guildData.channels.allChannels}]`,
          value: `<:text:815564331629412352> Текстовые: **${guildData.channels.text}**\n<:voice:815564247517626388> Голосовые: **${guildData.channels.voice}**\n<:category:815564242550915093> Категории: **${guildData.channels.category}**`,
          inline: true
        },
        {
          name: "Остальное",
          value: `<:forum:1009069033926180968> Роли: **${guildData.stats.roles}**\n<:invite_background:815564329226207242> Эмодзи: **${guildData.stats.emojis}**`,
          inline: true
        }
      ],
      color: cfg.color
    }
    message.reply({embeds: [embed]})
  }
      }