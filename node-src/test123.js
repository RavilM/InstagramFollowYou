let Instagram = require('./instagram');
Instagram = new Instagram()

Instagram.getCsrfToken().then((csrf) =>
{
    Instagram.csrfToken = csrf;
}).then(() =>
{
    return Instagram.auth('login', 'password').then(sessionId =>
    {
        Instagram.sessionId = sessionId



    })
}).catch(console.error);

// const fetch = require('node-fetch');
// const cookieReq = require('cookie');
// const cookieParser = require('cookie-parser');
// const Headers = require('fetch-cookie');
// const formData = require('form-data');
// const URLSearchParams = require('url-search-params');
//
// const instUrl = 'https://www.instagram.com/';
// const myHeaders = {
//     'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//     'origin': 'https://www.instagram.com',
//     'referer': 'https://www.instagram.com/',
//     'upgrade-insecure-requests': '1',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//     'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
//     'accept-encoding': 'gzip, deflate, br',
//     'cookie': 'ig _cb=1'
// };
//
// const myCookies = {
//     sessionid: undefined,
//     ds_user_id: undefined,
//     csrftoken: undefined,
//     shbid: undefined,
//     rur: undefined,
//     mid: undefined,
//     shbts: undefined,
//     mcd: undefined,
//     ig_cb: 1,
//     urlgen: undefined
// };
//
// let csrftoken;
// let rollout_hash;
// let cookies_init;
// let cookies_auth;
// let cookies_tag;
//
// fetch(instUrl, {
//     method: 'GET',
//     headers: myHeaders
// })
//     .then(response => {
//         const cookies_init = response.headers.get('set-cookie');
//         console.log('init cookie', cookieReq.parse(cookies_init));
//         return response.text();
//     })
//     .then(text => {
//
//         var subStr = text;
//         var startStr = '<script type="text/javascript">window._sharedData = ';
//         var start = subStr.indexOf(startStr) + startStr.length;
//
//         subStr = subStr.substr(start, subStr.length);
//
//         subStr = subStr.substr(0, subStr.indexOf('</script>') - 1);
//
//         var json = JSON.parse(subStr);
//
//         csrftoken = json.config.csrf_token;
//
//         rollout_hash = json.rollout_hash;
//
//         return csrftoken;
//     })
//     .then(token => {
//         var myFormData = new URLSearchParams();
//         myFormData.append('queryParams', '{"source":"auth_switcher"}');
//
//         fetch(`${instUrl}accounts/login/ajax/`, {
//             method: 'POST',
//             body: myFormData,
//
// // cookie: mcd=3; mid=W2iOFwAEAAE9K6Md5EZ8FkDGKvZo; shbid=16732; shbts=1545077285.4617918; rur=ATN; csrftoken=9WkRk3LiFnWiWXXzcfpSchAZdPVUTIw3; urlgen="{\"109.252.43.41\": 25513}:1gZjID:WgVVjNjAcOVID4obHSCcx2MsDaA"
// // referer: https://www.instagram.com/accounts/login/?source=auth_switcher
// // user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36
//
//             headers: {
//                 // 'accept': '*/*',
//                 // 'accept-encoding': 'gzip, deflate, br',
//                 // 'content-length': myFormData.length,
//                 // 'content-type': 'application/x-www-form-urlencoded',
//
// // cookie: mcd=3; mid=W2iOFwAEAAE9K6Md5EZ8FkDGKvZo; shbid=16732; shbts=1545077285.4617918; rur=ATN; csrftoken=9WkRk3LiFnWiWXXzcfpSchAZdPVUTIw3; urlgen="{\"109.252.43.41\": 25513}:1gZjID:WgVVjNjAcOVID4obHSCcx2MsDaA"
//
//                 // 'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//                 'origin': 'https://www.instagram.com',
//                 'referer': 'https://www.instagram.com/',
//                 // 'upgrade-insecure-requests': '1',
//                 // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//                 'cookie': `mid=W2iOFwAEAAE9K6Md5EZ8FkDGKvZo`,
//                 // 'cookie': cookies_init,
//                 'x-csrftoken': token,
//                 // 'x-instagram-ajax': rollout_hash,
//                 // 'x-requested-with': 'XMLHttpRequest',
//             }
//         })
//             .then(response => {
//                 cookies_auth = response.headers.get('set-cookie');
//                 // console. log('cookie AUTH', response.headers.get('set-cookie'));
//                 console.log('cookie AUTH', cookieReq.parse(cookies_auth));
//
//                 return response.text();
//             })
//             .then(text => {
//                 console.log('Result AUTH', text);
//
//
//                 const myCookie = `csrftoken=${token};`;
//
//                 const tagFind = 'travel';
//
//                 fetch(`${instUrl}explore/tags/${tagFind}`, {
//                     method: 'GET',
//                     headers: {
//                         'cookie': cookies_auth,
//                         'accept-encoding': 'gzip, deflate, br',
//                     }
//                 })
//                     .then(response => {
//                         cookies_tag = response.headers.get('set-cookie');
//
//                         // console.log('GET DATA TAG cookie', response.headers.get('set-cookie'));
//
//                         return response.text();
//                     })
//                     .then(response => {
//                         // console.log('get text', response);
//                         // console.log('test new', JSON.parse(response.match(/\<script type=\"text\/javascript\">window\._sharedData \=(.*)\;<\//)[1]));
//                         const usersDataTest = JSON.parse(response.match(/\<script type=\"text\/javascript\">window\._sharedData \=(.*)\;<\//)[1]);
//                         const data = usersDataTest.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
//                         const dataUser = data[0].node.owner.id;
//                         // console.log('data', data);
//                         // console.log('DATAUSER', dataUser);
//
//                         fetch(`${instUrl}web/friendships/${dataUser}/follow/`, {
//                             method: 'POST',
//                             headers: {
//                                 'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//                                 'referer': 'https://www.instagram.com/',
//                                 'content-type': 'application/x-www-form-urlencoded',
//                                 'upgrade-insecure-requests': '1',
//                                 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//                                 'accept': '*/*',
//                                 'accept-encoding': 'gzip, deflate, br',
//                                 'cookie': `csrftoken=${token}; shbid=3649; shbts=1544994717.146112; ds_user_id=3961102700; sessionid=3961102700%3AiHos0TNZZeAPHM%3A6; urlgen="{\"109.252.43.41\": 25513}:1gYdt5:INiW1QvXCoU90O9P98-_r8BaQwM"`,
//                                 // 'cookie': cookies_auth,
//                                 'origin': 'https://www.instagram.com',
//                                 'x-instagram-ajax': '7db9d6f0b747',
//                                 'x-requested-with': 'XMLHttpRequest',
//                                 'x-csrftoken': token
//                             }
//                         })
//                             .then(response => {
//                                 console.log('FOLLOW response', response);
//
//                                 return response.text();
//                             })
//                             .then(text => {
//                                 console.log('FOLLOW text', text);
//                             })
//                             .catch(error => console.log('FOLLOW error', error))
//
//                     })
//                     .catch(error => console.log('GET DATA TAG error', error))
//
//
//
//             })
//             .catch(error => console.log('AUTH error', error))
//     })
//     .catch(error => console.log('TOKEN error', error));
//
//
//
//
//
// const fetch = require('node-fetch');
// const cookieParser = require('cookie');
// const Headers = require('fetch-cookie');
// const formData = require('form-data');
// const URLSearchParams = require('url-search-params');
//
// const instUrl = 'https://www.instagram.com/';
// const myHeaders = {
//     'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//     'origin': 'https://www.instagram.com',
//     'referer': 'https://www.instagram.com/',
//     'upgrade-insecure-requests': '1',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//     'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
//     'accept-encoding': 'gzip, deflate, br',
//     'cookie': 'ig _cb=1'
// };
//
// const myCookies = {
//     sessionid: undefined,
//     ds_user_id: undefined,
//     csrftoken: undefined,
//     shbid: undefined,
//     rur: undefined,
//     mid: undefined,
//     shbts: undefined,
//     mcd: undefined,
//     ig_cb: 1,
//     urlgen: undefined
// };
//
// const parsCookie = (cookie) => {
//     const formatCookie = cookieParser.parse(cookie);
//     // console.log('FORMATCOOKIE', formatCookie);
//     for (let key in formatCookie) {
//         if (formatCookie[key]) {
//             if (key.includes('Secure')) {
//                 const formatKey = key.replace('Secure, ', '');
//
//                 myCookies[formatKey] = formatCookie[key];
//             } else {
//                 myCookies[key] = formatCookie[key];
//             }
//         }
//     }
//     // console.log('Attention  RESULT  !!!! ', myCookies);
//
//     return myCookies;
// };
//
//
// let csrftoken;
// let rollout_hash;
// let cookies_init;
// let cookies_auth;
// let cookies_tag;
// // setInterval(function () {
//
// fetch(instUrl, {
//     method: 'GET',
//     headers: myHeaders
// })
//     .then(response => {
//         cookies_init = response.headers.get('set-cookie');
//         // console.log('cookies_init', cookies_init)
//         // parsCookie(cookies_init);
//         return response.text();
//     })
//     .then(text => {
//
//         let subStr = text;
//         const startStr = '<script type="text/javascript">window._sharedData = ';
//         const start = subStr.indexOf(startStr) + startStr.length;
//
//         subStr = subStr.substr(start, subStr.length);
//
//         subStr = subStr.substr(0, subStr.indexOf('</script>') - 1);
//
//         const json = JSON.parse(subStr);
//
//         csrftoken = json.config.csrf_token;
//
//         rollout_hash = json.rollout_hash;
//
//         return parsCookie(cookies_init);
//     })
//     .then(token => {
//         // console.log('token', token)
//         var myFormData = new URLSearchParams();
//         myFormData.append('queryParams', '{"source":"auth_switcher"}');
// // console.log(`111111111 mid=${myCookies.mid}`);
//         fetch(`${instUrl}accounts/login/ajax/`, {
//             method: 'POST',
//             body: myFormData,
//             headers: {
//                 'accept': '*/*',
//                 'accept-encoding': 'gzip, deflate, br',
//                 'content-length': myFormData.length,
//                 'content-type': 'application/x-www-form-urlencoded',
//
// // cookie: mcd=3; mid=W2iOFwAEAAE9K6Md5EZ8FkDGKvZo; shbid=16732; shbts=1545077285.4617918; rur=ATN; csrftoken=9WkRk3LiFnWiWXXzcfpSchAZdPVUTIw3; urlgen="{\"109.252.43.41\": 25513}:1gZjID:WgVVjNjAcOVID4obHSCcx2MsDaA"
//
//                 'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//                 'origin': 'https://www.instagram.com',
//                 'referer': 'https://www.instagram.com/',
//                 'upgrade-insecure-requests': '1',
//                 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//                 'cookie': `mid=W2iOFwAEAAE9K6Md5EZ8FkDGKvZo`,
//                 // 'cookie': `mid=${myCookies.mid}; shbid=${myCookies.shbid}; shbts=${myCookies.shbts}; csrftoken=${myCookies.csrftoken}; urlgen=${myCookies.urlgen}`,
//                 'x-csrftoken': csrftoken,
//                 'x-instagram-ajax': rollout_hash,
//                 'x-requested-with': 'XMLHttpRequest',
//             }
//         })
//             .then(response => {
//                 cookies_auth = response.headers.get('set-cookie');
//                 // console.log('cookie AUTH', cookieParser.parse(cookies_auth));
//                 parsCookie(cookies_auth);
//                 return response.text();
//             })
//             .then(text => {
//                 console.log('Result AUTH', text);
//
//
//                 const myCookie = `csrftoken=${csrftoken};`;
//
//                 const tagFind = 'travel';
//
//                 console.log('there')
//                 fetch(`${instUrl}explore/tags/${tagFind}`, {
//                     method: 'GET',
//                     headers: {
//                         'cookie': myCookie,
//                         'accept-encoding': 'gzip, deflate, br',
//                     }
//                 })
//                     .then(response => {
//                         cookies_tag = response.headers.get('set-cookie');
//
//                         return response.text();
//                     })
//                     .then(response => {
//
//                         const usersDataTest = JSON.parse(response.match(/\<script type=\"text\/javascript\">window\._sharedData \=(.*)\;<\//)[1]);
//                         const data = usersDataTest.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
//                         const dataUser = data[0].node.owner.id;
//
//
//                         fetch(`${instUrl}web/friendships/${dataUser}/follow/`, {
//                             method: 'POST',
//                             headers: {
//                                 'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
//                                 'referer': 'https://www.instagram.com/',
//                                 'content-type': 'application/x-www-form-urlencoded',
//                                 'upgrade-insecure-requests': '1',
//                                 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//                                 'accept': '*/*',
//                                 'accept-encoding': 'gzip, deflate, br',
//                                 'cookie': `csrftoken=${csrftoken}; shbid=3649; shbts=1544994717.146112; ds_user_id=3961102700; sessionid=3961102700%3AiHos0TNZZeAPHM%3A6; urlgen="{\"109.252.43.41\": 25513}:1gYdt5:INiW1QvXCoU90O9P98-_r8BaQwM"`,
//                                 // 'cookie': cookies_auth,
//                                 'origin': 'https://www.instagram.com',
//                                 'x-instagram-ajax': '7db9d6f0b747',
//                                 'x-requested-with': 'XMLHttpRequest',
//                                 'x-csrftoken': csrftoken
//                             }
//                         })
//                             .then(response => {
//                                 console.log('FOLLOW response', response);
//
//                                 return response.text();
//                             })
//                             .then(text => {
//                                 console.log('FOLLOW text', text);
//                             })
//                             .catch(error => console.log('FOLLOW error', error))
//                     })
//                     .catch(error => console.log('GET DATA TAG error', error))
//
//
//             })
//             .catch(error => console.log('AUTH error', error))
//     })
//     .catch(error => console.log('TOKEN error', error));
// // }, 1000 * 60 * 1.7)




const testCookie = 'target=""; Domain=instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; Domain=.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; Domain=i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; Domain=.i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; Domain=www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; Domain=.www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, target=""; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, ds_user_id=3961102700; Domain=.instagram.com; expires=Sat, 20-Apr-2019 19:08:38 GMT; Max-Age=7776000; Path=/; Secure, shbts=1548011318.8852122; Domain=.instagram.com; expires=Sun, 27-Jan-2019 19:08:38 GMT; HttpOnly; Max-Age=604800; Path=/; Secure, csrftoken=""; Domain=i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, csrftoken=""; Domain=.i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, csrftoken=""; Domain=www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, csrftoken=""; Domain=.www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, csrftoken=""; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, csrftoken=nYexSERQqiLC0T9bx3zWlIWuZO8ZuE4v; Domain=.instagram.com; expires=Sun, 19-Jan-2020 19:08:38 GMT; Max-Age=31449600; Path=/; Secure, shbid=3649; Domain=.instagram.com; expires=Sun, 27-Jan-2019 19:08:38 GMT; HttpOnly; Max-Age=604800; Path=/; Secure, sessionid=3961102700%3AcyXlRV7HrYbFcM%3A2; Domain=.instagram.com; expires=Mon, 20-Jan-2020 19:08:38 GMT; HttpOnly; Max-Age=31536000; Path=/; Secure, mid=""; Domain=i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, mid=""; Domain=.i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, mid=""; Domain=www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, mid=""; Domain=.www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, mid=""; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/, mid=XETHNgAEAAEMQ2phLDkSL23ht7LY; Domain=.instagram.com; expires=Wed, 17-Jan-2029 19:08:38 GMT; Max-Age=315360000; Path=/; Secure, rur=ATN; Domain=.instagram.com; HttpOnly; Path=/; Secure, mcd=3; Domain=.instagram.com; expires=Wed, 17-Jan-2029 19:08:38 GMT; Max-Age=315360000; Path=/; Secure'