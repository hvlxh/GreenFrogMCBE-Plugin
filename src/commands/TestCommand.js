const Command = require("../base/Command")

class TestCommand extends Command {
  constructor() {
    super("test", "Hello")
  }

  run(player) {
    player.sendMessage("Test")
  }
}

module.exports = TestCommand
