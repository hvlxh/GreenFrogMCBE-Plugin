const BasePlugin = require('./src/base/Plugin')

class Plugin extends BasePlugin {
  playerSpawn(event) {
    this.api.getLogger().info(event.player.username)
  }
}

module.exports = new Plugin()