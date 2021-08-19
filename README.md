# Toggle - Social Media Prototype
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
* Heroku
* AtlasDB
* AWS S3 Bucket


## Features
* User registration
* Each user has a profile, which contains statistics for the current user - their results, filtered from highest to lowest, as well as all the quizzes created by them
* User Authentication - only logged in users can solve and create quizzes. Only quiz author can edit or delete their own quizzes. A guest can only browse through the quizzes.
* Diffrent topics, by which quizzes can be filtered
* Interactive quizz editor
* Timer, which tracks the time for taking the quizz. When the time is over the quiz submits automatically as it is in the moment the time ends. The amount of time is set up by the quiz author.
* QuizzMe is a responsive application, meaning it can be used on all devices - mobile, tablets, PC


## Views
* Landing Page (Home Page) - User view - greeting user, updated user navigation, three most recent quizzes. Guest view - a short information about the app, guest navigation, three most recent quizzes
* Login/Register - registration with username, email and password. Login with username and password
* Profile Page - Highest result , followed by an option to see all results, sorted in descending order. Option to see all quizzes, created by the current user
* Browse Page - a list with all quizzes and an option to filter them by quiz topic
* Details Page - additional quiz description, statistics for how many times the quiz has been taken, link to author's profile page, start quizz button
* Contest Mode - answering questions, each question is a separated view, interactive quiz navigation
* Result Page - results summary with options to retake the quiz or see details about current result
* Editor Page - view for creating and editing quizzes, questions and answeres 

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