class Command {
  /**
   *
   * @param {{ name: string; description: string } | string} name
   * @param {string} description
   */
  constructor(name, description) {
    if (typeof name == "object") {
      this.info = name
    } else {
      console.log(name, description)
      this.info = {
        name,
        description,
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
