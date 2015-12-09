# Chatroom
> This chatroom is based on r2(react+redux), socket.io and mongolab.

### Get Started

1) Setup mongodb server

```
brew install mongodb
```

2) Login then create db, collection and user.

```
$ mongo
$ use chatroom
$ db.createCollection("channels")
$ db.createCollection("messages")
$ db.createUser({"user": "user", "pwd": "pass", "roles": ["readWrite"]})
$ db.channels.insert({"id": 1, "name": "General"})
```

3) Rename .env.sample to .env and modify settings.

```
PORT="YOUR_PORT_NUMBER"
MONGO_URL="mongodb://USER:PASS@DOMAIN:PORT/DBNAME"
```

4) Start mongodb and server

```
npm start
```

### Start Develop

```
npm run start:dev
```

This will start a development server with react-transform-hmr.

### Build Client Bundle JS

```
npm run build
```
