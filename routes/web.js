const authController = require('../app/http/controlers/authController')
const cartController = require('../app/http/controlers/customers/cartController')
const homeController = require('../app/http/controlers/homeController')

 function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login',authController().login)
    app.get('/rege',authController().regester)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

}

module.exports = initRoutes