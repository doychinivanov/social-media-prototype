const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
// const {COOKIE_NAME, TOKEN_SECRET} = require('../config/index');


module.exports = () => (req, res, next)=>{
    if(parseToken(req, res)){
        req.auth = {
            async register(userData){
                const data = await register(userData);
                // const token = await register(userData);
                res.cookie(process.env.COOKIE_NAME, data.token);
                return data._id
            },
            async login(email, password){
                const token = await login(email, password);
                res.cookie(process.env.COOKIE_NAME, token);
            },
            logout(){
                res.clearCookie(process.env.COOKIE_NAME);
                res.clearCookie('CURRENT_USER_TOKEN');
                res.clearCookie('CURRENT_USER_NAME');
            }
        };

        next();
    };
};


async function register(userData){
    const existingUsername = await userService.getUserByUsername(userData.username);
    const existingEmail = await userService.getUserByEmail(userData.email);

    if(existingUsername){
        throw new Error('A user with that username already exists!');
    };

    if(existingEmail){
        throw new Error('Email is already taken!')
    }

    const isPrivate = userData.isPrivate ? true : false;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userService.createUser(userData.email, userData.username, hashedPassword, new Date(userData.birthday), isPrivate, userData.profilePicture);

    return {token: generateToken(user), _id: user._id};

}


async function login(email, password){
    const user = await userService.getUserByEmail(email);

    if(!user || await bcrypt.compare(password, user.hashedPassword) == false){
        throw new Error('Wrong username or password!');
    };
    
    return generateToken(user);
}

function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
    }, process.env.TOKEN_SECRET)
};

function parseToken(req, res){
    const token = req.cookies[process.env.COOKIE_NAME];

    if(token){
        try{
            const userData = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
            res.cookie('CURRENT_USER_TOKEN', userData._id);
            res.cookie('CURRENT_USER_NAME', userData.username);
        } catch(err){
            res.clearCookie(process.env.COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    };

    return true;
}