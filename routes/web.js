const authController = require('../app/http/controlers/authController')
const cartController = require('../app/http/controlers/customers/cartController')
const homeController = require('../app/http/controlers/homeController')
const orderController = require('../app/http/controlers/customers/orderController')
const adminOrderController = require('../app/http/controlers/admin/orderController')
const adminStatusController = require('../app/http/controlers/admin/statusController')

//middle wares
const guest = require('../app/http/middlevares/guest')
const auth = require('../app/http/middlevares/auth')
const admin = require('../app/http/middlevares/admin')

 function initRoutes(app) {
    app.get('/', homeController().index)

    app.get('/login',guest, authController().login)
    app.post('/login',authController().postlogin)

    app.get('/register',guest, authController().register)
    app.post('/register',authController().postregister)
    app.post('/logout',authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)
    
    //customers routes
    app.get('/customer/orders',auth, orderController().index)
    app.get('/customer/orders/:id',auth, orderController().show)
    app.post('/orders',auth, orderController().store)

    //admin routes
    app.get('/admin/orders',admin, adminOrderController().index)
    app.post('/admin/order/status',admin, adminStatusController().update)
}

module.exports = initRoutes