# Voltaire
A web chat with realtime broadcast of messages made with express and nodejs.

## Techs
 - Cors middleware enabled;
 - JWT to authenticate user requests;
 - Bcrypt to do a secure authentication; 
 - Sequelize to storage all users, rooms and messages in a relational db;
 - Using socket.io to broadcast the messages in real time;

Everything has been configured to work with enviroment variables or a .env file, please look at the [ [.env.example](.env.example) ].

Front-end will be improved someday, please be patient :)
