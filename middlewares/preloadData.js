function preloadPosts() {
    return async (req, res, next) => {
        req.data = req.data || {};

        if(req.user){
            try {
                const posts = await req.storage.getPostsByAuthorId(req.user._id);
    
                if (posts) {
                    req.data.currentUsersPost = posts.map(x => x._id);
                };
    
            } catch (err){
                console.error('Database error: ', err.message)
            }
        }

        next();
    }
}

function preloadComments(){
    return async (req, res, next) => {
        req.data = req.data || {};

        if(req.user){
            try {
                const comments = await req.storage.getCommentsByAuthorId(req.user._id);
    
                if (comments) {
                    req.data.currentUsersComments = comments.map(x => x._id);
                };
    
            } catch (err){
                console.error('Database error: ', err.message)
            }
        }

        next();
    }
}


module.exports = {
    preloadPosts,
    preloadComments
}