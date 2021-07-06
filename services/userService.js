const User = require('../models/User');

async function createUser(email, username, hashedPassword, birthday, isPrivate){
    const user = new User({
        email,
        username,
        hashedPassword,
        birthday: birthday || null,
        private: isPrivate,
        posts: [],
        following: [],
        followers: []
    });

    await user.save();

    return user;
};

async function getUserByUsername(username){
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({username: {$regex: pattern}}).populate('following').lean();

    return user;
};

async function getUserById(id){
    const user = await User.findById(id).populate('following');

    return user;
}

async function getAllUsersContainingUsername(username){
    const pattern = new RegExp(username, 'i');
    const users = await User.find({username: {$regex: pattern}}).populate('following');

    return users;
};

async function getUserByEmail(email){
    const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({email: {$regex: pattern}}).populate('following');

    return user;
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    getAllUsersContainingUsername,
}