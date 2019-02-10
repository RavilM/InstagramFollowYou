module.export = class InstaFollowYou {
    constructor(csrfToken, sessionId) {
        this.csrfToken = csrfToken
        this.sessionId = sessionId
        this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        this.userIdFollowers = {};
        this.timeoutForCounter = 300
        this.timeoutForCounterValue = 30000
        this.paginationDelay = 30000
        this.receivePromises = {}
        this.searchTypes = ['location', 'hashtag']

        this.essentialValues = {
            sessionid: undefined,
            ds_user_id: undefined,
            csrftoken: undefined,
            shbid: undefined,
            rur: undefined,
            mid: undefined,
            shbts: undefined,
            mcd: undefined,
            ig_cb: 1,
            //urlgen      : undefined //this needs to be filled in according to my RE
        };

        this.baseHeader = {
            'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
            'origin': 'https://www.instagram.com',
            'referer': 'https://www.instagram.com/',
            'upgrade-insecure-requests': '1',
            'user-agent': this.userAgent,
        }
    }
};