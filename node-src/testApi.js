const InstaFollowYou = require('./api');

const instagramFollower = new InstaFollowYou({login: 'login', password: 'password'});

instagramFollower.getToken()
    .then(() => instagramFollower.authenticate());