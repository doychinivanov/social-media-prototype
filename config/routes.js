const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentsController');
const chatController = require('../controllers/chatController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/user', userController);
    app.use('/post', postController);
    app.use('/comments', commentController);
    app.use('/chat', chatController);
    app.use('*', (req, res)=> res.send('Not Found :('));
};