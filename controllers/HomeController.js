class HomeController{

  async index(req, res){
      res.send("APP EXPRESS! - Guia Fulldevstcks")
  }

}

module.exports = new HomeController()