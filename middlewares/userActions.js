const userService = require('../services/userService');

module.exports = () => (req, res, next) => {
    req.actions = {
        async followPerson(id) {
            const userToBeFollowed = await userService.getUserById(id);
            const userFollowing = await userService.getUserById(req.user._id);

            if(id == req.user._id){
                throw new Error ('You can\'t follow yourself!');
            }

            if (!userToBeFollowed) {
                throw new Error('Such user doesn\'t exist!');
            }

            if(!userFollowing){
                throw new Error('Please try again later. Something went wrong. :(');
            }

            if(userToBeFollowed.followers.includes(req.user._id)){
                throw new Error(`You\'ve already followed ${userToBeFollowed.username}`);
            }
        
            await Promise.all([userToBeFollowed.followers.push(req.user._id), userFollowing.following.push(id)])

            userToBeFollowed.save();
            userFollowing.save();
        
            return userToBeFollowed;
        
        },
        async unfollowPerson(id){
            const userToBeUnFollowed = await userService.getUserById(id);
            const userUnfollowing = await userService.getUserById(req.user._id);

            if(id == req.user._id){
                throw new Error ('Forbidden operation!');
            }

            if (!userToBeUnFollowed) {
                throw new Error('Such user doesn\'t exist!');
            }

            if(!userUnfollowing){
                throw new Error('Please try again later. Something went wrong. :(');
            }

            if(!userToBeUnFollowed.followers.includes(req.user._id)){
                throw new Error('You can\'t unfollow a user you have not followed yet.');
            }

            userToBeUnFollowed.followers.splice(userToBeUnFollowed.followers.indexOf(req.user._id), 1);
            userUnfollowing.following.splice(userUnfollowing.following.indexOf(id), 1);

            userToBeUnFollowed.save();
            userUnfollowing.save();

            return userToBeUnFollowed;
        }
    };

    next();
};