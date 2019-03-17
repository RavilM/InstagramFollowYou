const fetch = require('node-fetch');
const Headers = require('fetch-cookie');
const formData = require('form-data');
// const URLSearchParams = require('url-search-params');

// let cookies_init;
// let cookies_auth;
// let cookie_userInfo;
// let userId = [];
// let end_cursor;
// let i = 0;

module.exports = class InstaFollowYou {
    constructor({login, password, csrfToken, sessionId, rollout_hash}) {
        this.login = login;
        this.password = password;
        this.csrfToken = csrfToken;
        this.rollout_hash = rollout_hash;
        this.sessionId = sessionId;
        this.userIdFollowers = {};
        this.timeoutForCounter = 300;
        this.timeoutForCounterValue = 30000;
        this.paginationDelay = 30000;
        this.receivePromises = {};
        this.searchTypes = ['location', 'hashtag'];
        this.instUrl = 'https://www.instagram.com/';

        this.cookieValues = {
            csrftoken: undefined,
            ds_user_id: undefined,
            ig_cb: 1,
            mcd: undefined,
            mid: undefined,
            rur: undefined,
            sessionid: undefined,
            shbid: undefined,
            shbts: undefined,
            urlgen: undefined
        };

        this.headers = {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://www.instagram.com',
            'referer': 'https://www.instagram.com',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
    }

    cookiesParser(cookie) {
        const splitCookies = cookie.split(';');

        splitCookies.forEach((cookie) => {
            if (cookie.includes(' Secure, ')) {
                const secureCookie = cookie.replace(' Secure, ', '');
                const splitSecureCookie = secureCookie.split('=');

                if (splitSecureCookie[1] !== '""') {
                    this.cookieValues[splitSecureCookie[0]] = splitSecureCookie[1]
                }
            } else if (cookie.includes(' Path=/, ')) {
                const pathCookie = cookie.replace(' Path=/, ', '');
                const splitPathCookie = pathCookie.split('=');

                if (splitPathCookie[1] !== '""') {
                    this.cookieValues[splitPathCookie[0]] = splitPathCookie[1]
                }
            }
        });
    };

    getToken() {
        return fetch(this.instUrl, {
            'method': 'GET',
            'headers': this.headers
        })
            .then(response => {
                const cookieToToken = response.headers.get('set-cookie');

                this.cookiesParser(cookieToToken);

                return response.text();
            })
            .then(text => {
                let subStr = text;

                const startStr = '<script type="text/javascript">window._sharedData = ';
                const start = subStr.indexOf(startStr) + startStr.length;

                subStr = subStr.substr(start, subStr.length);

                subStr = subStr.substr(0, subStr.indexOf('</script>') - 1);

                const json = JSON.parse(subStr);

                this.csrftoken = json.config.csrf_token;

                this.rollout_hash = json.rollout_hash;
            })
            .catch(error => console.log('getToken error: ', error))
    }

    authenticate() {
        const myFormData = new URLSearchParams({
            username: this.login,
            password: this.password,
            queryParams: '{"source":"auth_switcher"}'
        });

        fetch(`${this.instUrl}accounts/login/ajax/`, {
            method: 'POST',
            body: myFormData,
            headers: {
                ...this.headers,
                'content-length': myFormData.length,
                'cookie': `mid=${this.cookieValues.mid}`,
                'x-csrftoken': this.cookieValues.csrftoken,
                'x-instagram-ajax': this.rollout_hash,
                'x-requested-with': 'XMLHttpRequest',
            }
        })
            .then(response => {
                const cookieToAuthenticate = response.headers.get('set-cookie');

                this.cookiesParser(cookieToAuthenticate);

                return response.text();
            })
            .then(text => {
                console.log('Result AUTH', text);
            })
            .catch(error => console.log('AUTH error', error))
    }
};