const User = require("../models/User")
const PasswordToken = require("../models/PasswordToken")

class UserController {

  async index(req, res) {
    let users = await User.findAll()
    res.json(users)
  }

  async findUser(req, res) {
    let id = req.params.id
    let user = await User.findById(id)
    if (user === undefined) {
      res.status(404)
      res.json({ err: "Usuário não encontrado. " })
    } else {
      res.status(200)
      res.json(user)
    }
  }

  async create(req, res) {
    const { name, email, password } = req.body

    if (name === undefined || name === '') {
      res.status(400)
      res.json({ err: "O nome é inválido." })
      return
    }

    if (email === undefined || email === '') {
      res.status(400)
      res.json({ err: "O e-mail é inválido." })
      return
    }

    if (password === undefined || password === '') {
      res.status(400)
      res.json({ err: "A senha é inválida." })
      return
    }

    let emailExists = await User.findEmail(email)

    if (emailExists) {
      res.status(406)
      res.json({ err: "O e-mail já está cadastrado!" })
      return
    }

    await User.new(name, email, password)

    res.status(200)
    res.send("Tudo OK!")
  }

  async edit(req, res) {
    let { id, name, email, role } = req.body
    let result = await User.update(id, name, email, role)

    if (result !== undefined) {
      if (result.status) {
        res.status(200)
        res.send("TUDO OK!")

      } else {
        res.status(406)
        res.send(result.err)
      }
    } else {
      res.status(406)
      res.send("Ocorreu um erro no servidor!")
    }

  }

  async remove(req, res) {
    let id = req.params.id
    let result = await User.delete(id)

    if (result.status) {
      res.status(200)
      res.send("TUDO OK!")
    } else {
      res.status(406)
      res.send(result.err)
    }
  }

  async recoverPassword(req, res) {
    let email = req.body.email
    let result = await PasswordToken.create(email)

    if (result.status) {
      res.status(200)
      res.send(""+result.token)
    } else {
      res.status(406)
      res.send(result.err)
    }
  }

  async changePassword(req, res) {
    let token = req.body.token 
    let password = req.body.password 
    let isTokenValid = await PasswordToken.validate(token)

    if (isTokenValid.status) {
      await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
      res.status(200)
      res.send("Senha aterada")
    } else {
      res.status(406)
      res.send(result.err)
    }
  }
}

module.exports = new UserController()