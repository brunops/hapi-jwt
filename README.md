# hapi jwt

just following [auth0 tutorial](https://auth0.com/blog/hapijs-authentication-secure-your-api-with-json-web-tokens/)

# Setup

```
$ brew install mongodb
$ mkdir -p data/db
$ mongo --dbpath ./data/db
$ node index.js
```

# Post to API

```
$ curl \
  -x POST \
  -H 'Content-Type: application/json' \
  -d '{ "username": "user", "email": "user@example.com", "password": "abcdefgh1" }'
```

# License

MIT

