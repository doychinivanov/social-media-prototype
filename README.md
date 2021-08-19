# Toggle - Social Media Prototype
<a href="https://toggle-social-media.herokuapp.com/" > Open Toggle </a>

## What is Toggle
Toggle is a prototype for social media, where a user can register, add a profile picture, follow people and be followed, create posts, comment on other people's posts and like them. Furthermore 'Toggle' provides a real-time chat service, in which users can create chat rooms, protected by a password.

Toggle is a Hybrid Application. It combines both Multi-Page Application and REST Service. The project aims to practice backend javascript, working with databases, cloud services, websocket, backend rendering, authentication with cookies, and others.


## Technologies
* express
* express-handlebars
* express-validator
* aws-sdk
* bcrypt
* cookie-parser
* jsonwebtoken
* mongoose
* socket.io
* multer
* dotenv
* lit-html
* bootstrap
* Heroku
* AtlasDB
* AWS S3 Bucket


## Features
* Landing Page
* User registration/login
* Each user has a profile, which contains their posts, private data and profile picture *(optional)*
* User Authentication - only logged in users can create posts, like posts, comment on posts, follow people and participate in chat rooms
* Search - users can be found by their username
* Chat Service - real-time chat application using socket.io. The chat application consists of chat rooms, protected by password.
* Private account - choosing a private account means that only users that follow you can see your activity on Toggle
* Profile Picture - when registerin you can upload a picture for your profile. This is entirely optional. In a picture is not presented you are given a custom one.
* Profle page - all recent activity of the user, their email, profile picture and list of people who follow them and who the user is following.
* News Feed Page - accessible only for logged in users. In the news feed you can see all recent activity of the people you follow.

## Installation
All dependencies are listed in the package.json file. To run the project you must install all of them. You also must have MongoDB installed locally. Change the connection string to your local database in *databaseConfig,js* file, located in *config* folder, and you will be all set. 

## Data Structure
### Collections
* users
```javascript
{
    _id: String
    email: String,
    username: String,
    hashedPassword: String,
    profilePicture: Boolean,
    followers: Array,
    following: Array,
    posts: Array,
    birthday: Date
    private: Boolean
}
```
* posts
```javascript
{
    _id: String
    likes: Array,
    comments: Array,
    author: String,
    content: String,
    createdAt: Date,
}
```
* comments
```javascript
{
    _id_: String
    author: String,
    content: String,
    createdAt: Date,
    postId: String
}
```
* rooms
```javascript
{
    _id: String
    participants: Array,
    messages: Array,
    roomName: String,
    hashedPassword: String,
    creator: String
}
```
* messages
```javascript
{
    _id: String
    author: Array,
    text: String,
    createdAt: Date
}
```


## Access Control
* Guests can register, search for users, see users' profile pages in case they are not private
* Registered users create posts, like posts, comment posts, follow other users, be followed, join in chat rooms
* Private accounts can be seen only by users who follow them
* Posts can be deleted only by their creator