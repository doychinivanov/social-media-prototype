const jwt = require('jsonwebtoken');

function parseErrorFromCookie(req){
    const token = req.cookies[process.env.COOKIE_ERROR];

    if(token){
        try{
            const err = jwt.verify(token, process.env.TOKEN_SECRET);
            
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
    }, process.env.TOKEN_SECRET)
};

module.exports = {parseErrorFromCookie, generateToken};