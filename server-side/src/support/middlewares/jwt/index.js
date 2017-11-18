// const jwt = require('jsonwebtoken')

module.exports = (deps) => {
  return async (req, res, next) => {
    if (!deps.exclusions.includes(req.path)) {
      const token = req.headers['x-access-token']

      if (!token) {
        res.send(403, { error: 'Token não fornecido' })
        return false
      }

      return token

      // try {
      //   req.decoded = jwt.verify(token, process.env.JWT_SECRET)
      // } catch (error) {
      //   res.send(403, { error: 'Falha ao autenticar o token' })
      //   return false
      // }
    }

    next()
  }
}
