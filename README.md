# Realtime Web-chat

A web chat with realtime broadcast of messages made with express and nodejs.

## Backend

- Bcrypt and JWT to authentication user requests;
- Sequelize to storage all users, rooms and messages in a relational db;
- Socket.io to realtime messages broadcast;

## Frontend

- React and Tailwind to do a stylized and reactive frontend;
- Zustand and React-query to deal with application and server state management;
- Socket.io will listen to every new message and update in realtime;

---

## Backend Routes

List of all routes and the purpose of them:

- ```post('/api/users')``` - create a new user unverified.
- ```get('/api/users/verify')``` - automatically sended by email to verify user.
- ```post('/api/auth')``` - create a new JWT token to use on requests.
- ```get('/api/auth')``` - return the user data of token's owner.
- ```get('/api/users')``` - same as ```get('/api/auth')```.
- ```delete('/api/users')``` - delete the user owner of the token.
- ```get('/api/rooms')``` - return all the rooms that the user is in.
- ```post('/api/rooms')``` - associate a room to the user and create a room if it doesn't exists.
- ```get('/api/rooms/:roomId/messages')``` - get all the old messages if the user is in the room.
- ```post('/api/rooms/:roomId/messages')``` - send a message to everyone in the room.
- ```delete('/api/rooms/:roomId/messages')``` - delete one or more messages in the room.

## Frontend Routes

- ```/sign-in``` - sign in page (will be redirect to this page if not authenticated)
- ```/sign-up``` - sign up page
- ```/``` - the rest of the application runs at here

---

## Still in development

TODO:

- (frontend) Forms validation errors displaying
- (frontend) Edit modal to editable content
- (backend) REFACTORING ALL!
