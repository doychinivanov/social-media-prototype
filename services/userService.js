const User = require('../models/User');

async function createUser(email, username, hashedPassword, birthDay, isPrivate){
    const user = new User({
        email,
        username,
        hashedPassword,
        birthDay: birthDay || null,
        isPrivate: isPrivate || false,
        posts: [],
        following: [],
        followers: []
    });

    await user.save();

    return user;
};

async function getUserByUsername(username){
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await User.findOne({username: {$regex: pattern}});

    return user;
};

async function getUserByEmail(email){
    const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({email: {$regex: pattern}});

    return user;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
}