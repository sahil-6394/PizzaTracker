function authController() {

    return {
        login(req, res) {
            res.render('auth/login');
        },

        regester(req, res) {
            res.render('auth/rege')
        }
    }
}

module.exports = authController;