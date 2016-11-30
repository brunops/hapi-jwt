# hapi jwt

just following [auth0 tutorial](https://auth0.com/blog/hapijs-authentication-secure-your-api-with-json-web-tokens/)

# Setup

```
$ brew install mongodb
$ mkdir -p data/db
$ mongo --dbpath ./data/db
$ node index.js
```

# API

### POST `/users` - create user

```
$ curl \
  -x POST \
  -H 'Content-Type: application/json' \
  -d '{ "username": "user", "email": "user@example.com", "password": "abcdefgh1" }' \
  http://localhost:3000/users
```

### GET `/users` - list all users, only accessible by admins

```
$ curl \
  -x GET \
  -H 'Authorization: Bearer JWT_HERE' \
  http://localhost:3000/users
```

### POST `/users/authenticate` - authenticate user, wow

```
$ curl \
  -x POST \
  -H 'Content-Type: application/json' \
  -d '{ "username": "rick", "password": "wubalubadubdub" }' \
  http://localhost:3000/users/authenticate
```

# License

MIT

