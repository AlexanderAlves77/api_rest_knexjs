const jwt = require("jsonwebtoken")
const secret = "wa52krno69bbknawa77nbonwabnwa45obno"

module.exports = function (req, res, next) {

  const authToken = req.headers['authorization']

  if (authToken !== undefined) {
    const bearer = authToken.split(' ')
    let token = bearer[1]

    try {
      let decoded = jwt.verify(token, secret)
      
      if(decoded.role === 1) {
        next()
      } else {
        res.status(403)
        res.send("Você não tem permissão para isso!")
        return
      }
      
    } catch (error) {
      res.status(403)
      res.send("Você não está autenticado")
      return
    }

  } else {
    res.status(403)
    res.send("Você não está autenticado")
    return
  }

  next()
}