"use-strict";

let Instagram = require('./instagram');
Instagram = new Instagram();


Instagram.getCsrfToken().then((csrf) => {
    Instagram.csrfToken = csrf;
}).then(() => {
    return Instagram.auth('login', 'password').then(sessionId => {
        Instagram.sessionId = sessionId

        console.log('sessionId', sessionId);

        // return Instagram.getUserDataByUsername('username-for-get').then((t) => {
        //     return Instagram.getUserFollowers(t.graphql.user.id).then((t) => {
        //         console.log(t); // - instagram followers for user "username-for-get"
        //     })
        // })

    })
}).catch(console.error);