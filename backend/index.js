const express = require("express")
const app = express()
const router = require("./routes/routes")
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)



app.listen(8080, (req, res) => {
  console.log("Servidor rodando na porta 8080.")
})