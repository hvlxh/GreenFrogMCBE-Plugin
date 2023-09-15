class Command {
  /**
   *
   * @param {{ name: string; description: string; args: { min: number, max: number }, op: boolean } | string} name
   * @param {string} description
   */
  constructor(name, description, args, op) {
    if (typeof name == "object") {
      this.info = name
    } else {
      this.info = {
        name,
        description,
        args,
        op
      }
    }
  }

  /**
   * @abstract
   * @param {*} player
   * @param {string[]} arguments
   */
  run(player, parameters) {}
}

module.exports = Command
