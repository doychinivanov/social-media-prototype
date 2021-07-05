const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/user', userController);
    app.use('*', (req, res)=> res.send('Not Found :('));
};