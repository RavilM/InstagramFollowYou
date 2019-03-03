const fetch = require('node-fetch');
const Headers = require('fetch-cookie');
const formData = require('form-data');
const URLSearchParams = require('url-search-params');

const instUrl = 'https://www.instagram.com/';
const myHeaders = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
    'cache-control': 'no-cache',
    'origin': 'https://www.instagram.com',
    'referer': 'https://www.instagram.com',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
};

const myCookies = {
    sessionid: undefined,
    ds_user_id: undefined,
    csrftoken: undefined,
    shbid: undefined,
    rur: undefined,
    mid: undefined,
    shbts: undefined,
    mcd: undefined,
    ig_cb: 1,
    urlgen: undefined
};

const cookiesParser = (cookie) => {
    const splitCookies = cookie.split(';');

    splitCookies.forEach((cookie) => {
        // if (cookie.includes('urlgen')) {
        //     const splitUrlgenCookie = cookie.split('=');
        //
        //     if (splitUrlgenCookie[1] !== '""') {
        //         myCookies[splitUrlgenCookie[0]] = splitUrlgenCookie[1]
        //     }
        // } else
        if (cookie.includes(' Secure, ')) {
            const secureCookie = cookie.replace(' Secure, ', '');
            const splitSecureCookie = secureCookie.split('=');

            if (splitSecureCookie[1] !== '""') {
                myCookies[splitSecureCookie[0]] = splitSecureCookie[1]
            }
        } else if (cookie.includes(' Path=/, ')) {
            const pathCookie = cookie.replace(' Path=/, ', '');
            const splitPathCookie = pathCookie.split('=');

            if (splitPathCookie[1] !== '""') {
                myCookies[splitPathCookie[0]] = splitPathCookie[1]
            }
        }
    });
};


let csrftoken;
let rollout_hash;
let cookies_init;
let cookies_auth;
let cookie_userInfo;
let i = 0;

fetch(instUrl, {
    'method': 'GET',
    'headers': myHeaders
})
    .then(response => {
        cookies_init = response.headers.get('set-cookie');
        // console.log('cookies_init', cookies_init)
        cookiesParser(cookies_init);
        return response.text();
    })
    .then(text => {
        let subStr = text;
        const startStr = '<script type="text/javascript">window._sharedData = ';
        const start = subStr.indexOf(startStr) + startStr.length;

        subStr = subStr.substr(start, subStr.length);

        subStr = subStr.substr(0, subStr.indexOf('</script>') - 1);

        const json = JSON.parse(subStr);

        csrftoken = json.config.csrf_token;

        rollout_hash = json.rollout_hash;
    })
    .then(() => {
        // console.log('token', csrftoken)
        // console.log('Attention  RESULT  !!!! ', myCookies);

        var myFormData = new URLSearchParams();
        myFormData.append('username', login);
        myFormData.append('password', password);

        myFormData.append('queryParams', '{"source":"auth_switcher"}');

        fetch(`${instUrl}accounts/login/ajax/`, {
            method: 'POST',
            body: myFormData,
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
                'content-length': myFormData.length,
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': `mid=${myCookies.mid}`,
                // 'cookie': `mid=XESd6AAEAAGsBK1LhLE_n-IHP6RW`,
                'origin': 'https://www.instagram.com',
                'referer': 'https://www.instagram.com/',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'x-csrftoken': csrftoken,
                'x-instagram-ajax': rollout_hash,
                'x-requested-with': 'XMLHttpRequest',
            }
        })
            .then(response => {
                cookies_auth = response.headers.get('set-cookie');
                // console.log('cookie AUTH', cookies_auth);
                cookiesParser(cookies_auth);
                return response.text();
            })
            .then(text => {
                console.log('Result AUTH', text);


                fetch(`${instUrl}m.awwwx/`, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'accept-encoding': 'gzip, deflate, br',
                        'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
                        'referer': 'https://www.instagram.com/',
                        'cookie': `mid=${myCookies.mid}; mcd=${myCookies.mcd}; rur=${myCookies.rur}; csrftoken=${csrftoken}; shbid=${myCookies.shbid}; shbts=${myCookies.shbts}; ds_user_id=${myCookies.ds_user_id}; sessionid=${myCookies.sessionid}; urlgen=${myCookies.urlgen}`,
                        'origin': 'https://www.instagram.com',
                        'upgrade-insecure-requests': '1',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                    }
                })
                    .then(response => {
                        cookie_userInfo = response.headers.get('set-cookie');
                        cookiesParser(cookie_userInfo);
                        // 37479f2b8209594dde7facb0d904896a
                        return response.text();
                    })
                    .then(response => {

                        const query = {
                            id: myCookies.ds_user_id,
                            include_reel: true,
                            fetch_mutual: true,
                            first: 24
                        };

                        const variables = encodeURIComponent(JSON.stringify(query));

                        // setInterval(function () {

                        fetch(`${instUrl}graphql/query/?query_hash=c56ee0ae1f89cdbd1c89e2bc6b8f3d18&variables=${variables}`, {
                            method: 'GET',
                            headers: {
                                'accept': '*/*',
                                'accept-encoding': 'gzip, deflate, br',
                                'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
                                'referer': 'https://www.instagram.com/',
                                'cookie': `mid=${myCookies.mid}; mcd=${myCookies.mcd}; rur=${myCookies.rur}; csrftoken=${csrftoken}; shbid=${myCookies.shbid}; shbts=${myCookies.shbts}; ds_user_id=${myCookies.ds_user_id}; sessionid=${myCookies.sessionid}; urlgen=${myCookies.urlgen}`,
                                'upgrade-insecure-requests': '1',
                                'origin': 'https://www.instagram.com',
                                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                                'x-csrftoken': csrftoken,
                                'x-requested-with': 'XMLHttpRequest',
                            }
                        })
                            .then(response => {
                                console.log('response')
                                return response.text();
                            })
                            .then(text => {
                                console.log('test', text)
                                const parsedResponse = JSON.parse(text);
                                const userId = parsedResponse.data.user.edge_follow.edges[0].node.id;

                                // fetch(`${instUrl}web/friendships/${userId}/unfollow/`, {
                                //     method: 'POST',
                                //     headers: {
                                //         'accept': '*/*',
                                //         'accept-encoding': 'gzip, deflate, br',
                                //         'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
                                //         'referer': 'https://www.instagram.com/',
                                //         'content-length': '0',
                                //         'content-type': 'application/x-www-form-urlencoded',
                                //         'cookie': `csrftoken=${csrftoken}; shbid=${myCookies.shbid}; shbts=${myCookies.shbts}; ds_user_id=${myCookies.ds_user_id}; sessionid=${myCookies.sessionid}`,
                                //         'upgrade-insecure-requests': '1',
                                //         'origin': 'https://www.instagram.com',
                                //         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                                //         'x-csrftoken': csrftoken,
                                //         'x-instagram-ajax': '7db9d6f0b747',
                                //         'x-requested-with': 'XMLHttpRequest',
                                //     }
                                // })
                                //     .then(response => {
                                //         return response.text();
                                //     })
                                //     .then(text => {
                                //         i += 1;
                                //         console.log('UNFOLLOW text', text);
                                //         console.log(`UNFOLLOW dataUser ${userId}, i = ${i}, time=${Date()}`);
                                //     })
                                //     .catch(error => console.error('UNFOLLOW error', error))
                            })
                            .catch(error => console.error('GET USER FOLOWERS error', error))
                        // }, 1000 * 60 * 1.44)

                    })
                    .catch(error => console.error('GET USER INFO error', error))

            })
            .catch(error => console.log('AUTH error', error))
    })
    .catch(error => console.log('TOKEN error', error));