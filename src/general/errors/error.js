class InvalidArgumentError extends Error {
  constructor(name) {
    super(`Invalid argument '${name}'`)
  }
}

module.exports = {
  InvalidArgumentError
}