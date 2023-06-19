const CommandManager = require("../../src/player/CommandManager")
const CommandsManager = require("./src/CommandsManager")
const cmdManager = new CommandsManager()

module.exports = {
  async onLoad() {
    await cmdManager.load()
  },

  PlayerSpawnEvent({ player }) {
    const cmd_manager = new CommandManager()
    for (const cmd of cmdManager.commands) {
      cmd_manager.addCommand(player, cmd.name, cmd.description)
    }
  },

  PlayerCommandExecuteEvent({ command, player }) {
    cmdManager.handle({
      command,
      player,
    })
  },
}
