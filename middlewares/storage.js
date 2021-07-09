const postService = require('../services/postService');
const commentService = require('../services/commentService');

module.exports = () => (req,res,next) =>{

    req.storage = {
        ...postService,
        ...commentService
    }

    next();
}