function isUser(){
    return (req, res, next)=>{
        if(req.user){
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
};

function isGuest(){
    return (req, res, next)=>{
        if(!req.user){
            next();
        } else {
            res.redirect('/user/feed');
        }
    }
};

function isOwner(){
    return (req, res, next)=>{
        if(req.data.currentUsersPost && req.user && (req.data.currentUsersPost.find(x => x==req.params.id))){
            next();
        } else {
            res.redirect('/user/feed');
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}