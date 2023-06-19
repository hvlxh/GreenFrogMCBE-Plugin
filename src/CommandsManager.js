const { readdir } = require("fs/promises")

class CommandsManager {
  commands = []

  async load() {
    const files = await readdir("src/commands", { withFileTypes: true })
    for (const file of files) {
      if (!file.isFile())
        throw new Error("No sub-directory is allow in commands folder")
      const Cmd = require("./commands/{}".replace("{}", file.name))
      const command = new Cmd()

      this.commands.push(command)
    }
  }

  async handle({ command, player }) {
    for (const cmd of this.commands) {
      if ((command = "/" + cmd.name))
        cmd.run({
          player,
          command,
        })
    }
  }
}

module.exports = CommandsManager
