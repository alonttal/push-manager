class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }

  static of(e) {
    if (e instanceof HttpError) {
      return e
    }
    let error = e.message
    if (error.indexOf('duplicate key error') !== -1) {
      return new DuplicateEntityError(Object.keys(e.keyValue)[0])
    }
    if (e.errors) {
      const anError = Object.keys(e.errors)[0]
      if (anError && e.errors[anError].kind === 'required') {
        return new MissingPropertyError(e.errors[anError].path)
      }
    }
    return new UnknownError(e)
  }

  static ofMissingParameter(paramName) {
    return new MissingParameterError(paramName)
  }
}

class MissingParameterError extends HttpError {
  constructor(paramName) {
    super(400, `Missing '${paramName}' parameter`)
  }
}

class DuplicateEntityError extends HttpError {
  constructor(entityName) {
    super(400, `'${entityName}' already exists`)
  }
}

class MissingPropertyError extends HttpError {
  constructor(propName) {
    super(400, `Missing '${propName}' property`)
  }
}

class UnknownError extends HttpError {
  constructor(e) {
    console.log(e)
    super(500, "Unknown error")
  }
}

module.exports = HttpError