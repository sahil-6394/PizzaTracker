const authController = require('../app/http/controlers/authController')
const cartController = require('../app/http/controlers/customers/cartController')
const homeController = require('../app/http/controlers/homeController')
const guest = require('../app/http/middlevares/guest')

 function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login',guest, authController().login)
    app.post('/login',authController().postlogin)

    app.get('/register',guest, authController().register)
    app.post('/register',authController().postregister)
    app.post('/logout',authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

}

module.exports = initRoutes