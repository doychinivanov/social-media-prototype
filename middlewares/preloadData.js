function preloadPosts() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const posts = await req.storage.getPostsByAuthorId(req.user._id);

            if (posts) {
                req.data.currentUsersPost = posts.map(x => x._id);
            };
        } catch (err){
            console.error('Database error: ', err.message)
        }

        next();
    }
}


module.exports = {
    preloadPosts
}