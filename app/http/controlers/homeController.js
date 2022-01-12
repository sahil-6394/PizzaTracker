const Menue = require('../../models/Menue')

function homeController() {

    return {
         index(req, res) {
            Menue.find().then( (pizzas) => {
                return res.render('home', {pizzas: pizzas})
            })

            // const pizzas = await Menue.find()
            // console.log(pizzas)
            // return res.render('home', {pizzas: pizzas})
        }
    }
}

module.exports = homeController;