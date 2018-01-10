# NODE AUTHENTICATION App

## Getting Started

```
npm install -g gulp
npm install
gulp start
this will spin up a browsersync and nodedemon instance
open up http://localhost:7000/ in tab in chrome
```

```
### dependencies ###
React,
React router
Node,
Express

### HOW IT WORKS
When not logged in A user can visit three routes
home '/', '/login', '/'signup'

once user signs up
they will get a message stating that they have sucessfuly signed in now they can go to login and sign in
for signup page - application checks if it's a valid email and password - password must be 5 characters in length

once user logins they will be redirected to '/me' path which renders out namne and email and a link to logout to start process over again
and redirects back to home page

There's also a 404 page for paths not related to ones above

Authentication done via json web token and mongo has validation - password is hashed using bcrypt

user needs to set up own mongodb account - I'm using mlab

module.exports = {
    mongo: {mongolink},
    jwtSecret : {whateveryouwant}
};
