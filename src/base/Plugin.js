const packageInfo = require('../../package.json')
const Logger = require("../../src/utils/Logger");
const Frog = require("../../src/Frog");
const fs = require('fs/promises')
const CommandManager = require("../../src/server/CommandManager");

class BasePlugin {
  /**
   * @private
   */
  logger;

  constructor() {
    this.info = packageInfo
    this.logger = {
          info: (text) => Logger.log(this.info.name, text, 'info'),
          warn: (text) => Logger.log(this.info.name, text, 'warn'),
          error: (text) => Logger.log(this.info.name, text, 'error'),
          debug: (text) => Logger.log(this.info.name, text, 'debug'),
          messages: JSON.stringify(Logger.messages)
    }
    this.api = {
          getLogger: () => this.logger,
          sendMessage: (text) => Frog.broadcast(text),
          broadcastMessage: (text) => Frog.broadcast(text),
    }

    return {
      onLoad: async () => {
        this.getMemberFunctions().forEach((func) => {
          Frog.eventEmitter.on(func, this[func])
        })

        await this.loadCommands()
      }
    }
  }
 
  /**
   * @private
   */
  getMemberFunctions() {
    const prototype = Object.getPrototypeOf(this);
    const allProperties = Object.getOwnPropertyNames(prototype);
    const memberFunctions = allProperties.filter((propertyName) => {
      const property = prototype[propertyName];
      return typeof property === 'function';
    });

    return memberFunctions;
  }

  /**
   * @private
   */
  async loadCommands() {
    for(const file of await fs.readdir('./src/commands')) {
      const cmd = new (require('./src/commands/' + file))()
      CommandManager.commands.push({
        name: cmd.name,
        description: cmd.description,
        minArgs: cmd.args.min,
        maxArgs: cmd.args.max,
        requiresOp: cmd.op,
        execute: cmd.run
      })
    }
  }
}

module.exports = BasePlugin