const fs = require("fs")
const consola = require("consola")
const { Client, Collection } = require('discord.js');
const { search } = require('./Utils');

module.exports = class Bot extends Client {
  constructor(cfg) {
    super(cfg.botOptions)
    this.cfg = cfg
    this.commands = new Collection()
    this.aliases = new Collection()
    this.logger = consola
    this.slash = new Collection()
    this.a = 0
    this.d = 0
  }
  
  async starter() {
    try {
      await this.loadOperations();
      await this.login(token)
      this.logger.success("Бот Загружен")
      this.user.setPresence({ activities: [{ name: 'lendry#5197 | s.help', type: 3 }], status: 'idle' })
      await this.application.commands.set(this.slash);  
    } catch (e) {
      this.logger.error(e)
    }
  }
  
  
  async loadOperations() {
    const events = await search(`${__dirname}/../Events/*.js`);
    events.forEach(eventName => {
      const event = require(eventName);
      this.on(event.event, event.run.bind(null, this));
    });

    const cmds = await search(`${__dirname}/../cmds/**/*.js`)
    cmds.forEach((cmd) => {
      let c = require(cmd)
      if (c.name) { 
        this.commands.set(c.name, c) 
        this.a += 1
        if (c.aliases && Array.isArray(c.aliases)) c.aliases.forEach(alias => this.aliases.set(alias, c.name));
      } else this.b += 1
      
    })

    const scmds = await search(`${__dirname}/../scmds/**/*.js`)
    scmds.forEach((cmd) => {
      let c = require(cmd)
      if (c.name) { 
        this.slash.set(c.name, c) 
        this.a += 1
      } else this.b += 1
      
    })
    this.logger.info(`Было получено [${this.a+this.d}] команд, из них было загружено [${this.a}] команд`)
  }

  fatal(args) {
    this.logger.fatal(args)
  }
  error(args) {
    this.logger.error(args)
  }
  success(args) {
    this.logger.success(args)
  }
  warn(args) {
    this.logger.warn(args)
  }
  info(args) {
    this.logger.info(args)
  }
}