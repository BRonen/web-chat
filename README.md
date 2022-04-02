# Voltaire
A web chat with realtime broadcast of messages made with express and nodejs.

## Techs
 - Cors middleware enabled;
 - JWT to authenticate user requests;
 - Bcrypt to do a secure authentication; 
 - Sequelize to storage all users, rooms and messages in a relational db;
 - Using socket.io to broadcast the messages in real time;

Everything has been configured to work with enviroment variables or a .env file, please look at the [ [.env.example](.env.example) ].

<br/>

# Workflow

This is how the project works

## User creation, authentication and email verification

List of all routes and the purpose of them:
  - ```post('/api/users')``` - create a new user unverified.
  - ```get('/api/users/verify')``` - automatically sended by email to verify user.
  - ```post('/api/auth')``` - create a new JWT token to use on requests.
  - ```get('/api/auth')``` - return the user data of token's owner.
  - ```get('/api/users')``` - same as ```get('/api/auth')```.
  - ```delete('/api/users')``` - delete the user owner of the token.
  - ```get('/api/rooms')``` - return all the rooms that the user is in.
  - ```post('/api/rooms')``` - associate a room to the user and create a room if it doesn't exists.
  - ```post('/api/rooms/connect')``` - associate one or more rooms to the user.
  - ```get('/api/rooms/:roomId/messages')``` - get all the old messages if the user is in the room.
  - ```post('/api/rooms/:roomId/messages')``` - send a message to everyone in the room.
  - ```delete('/api/rooms/:roomId/messages')``` - delete one or more messages in the room.

<br/>

# Still in development

Front-end will be improved someday, please be patient :)
