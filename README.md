# Chatroom
> This chatroom is based on react.js, redux, socket.io and mongodb.

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
$ db.createUser({"user": "root", "pwd": "admin", "roles": ["readWrite"]})
$ db.channels.insert({"id": 1, "name": "General"})
```

3) Copy .env.sample and rename to .env

```
PORT="8080"
MONGO_URL="mongodb://root:admin@localhost:27017/chatroom"
```

4) Start development server

```
npm start
```

5) Build all and run

```
npm run build
```
