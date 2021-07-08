const jwt = require('jsonwebtoken');
const {COOKIE_ERROR, TOKEN_SECRET} = require('../config/index');

function parseErrorFromCookie(req){
    const token = req.cookies[COOKIE_ERROR];

    if(token){
        try{
            const err = jwt.verify(token, TOKEN_SECRET);
            
            if(err.errors.length > 0){
                return err;
            }

        } catch(err){
            return err;
        }
    };

    return true;
}

function generateToken(errors){
    return jwt.sign({
        errors
    }, TOKEN_SECRET)
};

module.exports = {parseErrorFromCookie, generateToken};