const Command = require("../base/Command")

class TestCommand extends Command {
  constructor() {
    super()
  }

  run(player) {
    player.sendMessage("Test")
  }
}

module.exports = TestCommand
