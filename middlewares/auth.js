const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const {COOKIE_NAME, TOKEN_SECRET} = require('../config/index');





async function register(email, username, password, birthDay, isPrivate){
    const existingUsername = await userService.getUserByUsername(username);
    const existingEmail = await userService.getUserByEmail(email);

    if(existingUsername){
        throw new Error('A user with that username already exists!');
    };

    if(existingEmail){
        throw new Error('Email is already taken!')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userService.createUser(email, username, hashedPassword, birthDay, isPrivate);

    return generateToken(user);

}


async function login(email, password){
    const user = userService.getUserByEmail(email);

    if(!user || await bcrypt.compare(password, user.hashedPassword) == false){
        throw new Error('Wrong username or password!');
    };

    return generateToken(user);
}

function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email
    }, TOKEN_SECRET)
};

function parseToken(req, res){
    const token = req.cookies[COOKIE_NAME];

    if(token){
        try{
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        } catch(err){
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }

    };

    return true;
}