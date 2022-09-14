const knex = require("../database/connection")
const bcrypt = require("bcrypt")

class User {

  async findAll() {
    try {
      let result = await knex.select(["id", "name", "email", "role"]).table("users")
      return result

    } catch (error) {
      console.log(error)
      return []
    }
  }

  async findById(id) {
    try {
      let result = await knex.select(["id", "name", "email", "role"])
        .where({ id: id }).table("users")

      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }

    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async new(name, email, password) {
    try {
      let hash = await bcrypt.hash(password, 10)
      await knex.insert({ name, email, password: hash, role: 0 }).table("users")

    } catch (error) {
      console.log(error)
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email: email })

      if (result.length > 0) {
        return true
      } else {
        return false
      }

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async update(id, name, email, role) {
    let user = await this.findById(id)

    if (user !== undefined) {
      let editUser = {}

      if (email !== undefined) {
        if (email !== user.email) {
          let result = await this.findEmail(email)

          if (result === false) {
            editUser.email = email
          } else {
            return { status: false, err: "O e-mail já está cadastrado!" }
          }
        }
      }

      if (name !== undefined) {
        editUser.name = name
      }

      if (role !== undefined) {
        editUser.role = role
      }

      try {
        await knex.update(editUser).where({ id: id }).table("users")
        return { status: true }
      } catch (err) {        
        return { status: false, err: err }
      }

    } else {
      return { status: false, err: "O usuário não existe!" }
    }
  }

  async delete(id) {
    let user = await this.findById(id) 
    
    if (user !== undefined) {
      try {
        await knex.delete().where({ id: id }).table("users")
        return { status: true }
      } catch (error) {
        return { status: false, err: error }
      }      
    } else {
      return { status: false, err: "O usuário não existe, portanto não pode ser deletado!" }

    }
  }
}

module.exports = new User()