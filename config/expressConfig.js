const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');
const userActions = require('../middlewares/userActions');
const storage = require('../middlewares/storage');
const {preloadPosts, preloadComments} = require('../middlewares/preloadData');

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(cookieParser());

    app.use(authMiddleware());
    app.use(userActions());
    app.use(storage());
    app.use(preloadPosts());
    app.use(preloadComments());
}