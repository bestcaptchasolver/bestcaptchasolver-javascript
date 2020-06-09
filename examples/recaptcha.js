// check dashboard for accesskey
window.in_solving = false;

// for more details check https://bestcaptchasolver.com/captchabypass-api
function example_recaptcha() {
    let ACCESS_TOKEN = 'ACCESS_TOKEN_HERE';
    var captcha_id = undefined;
    if(!in_solving) in_solving = true;
    else return log('Doing another task currently');

    document.getElementById('log').value = '';
    bestcaptchasolverapi.set_access_token(ACCESS_TOKEN);      // set token
    // balance
    bestcaptchasolverapi.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving recaptcha');
        return bestcaptchasolverapi.submit_recaptcha({
            page_url: 'PAGE_URL_HERE',
            site_key: 'SITE_KEY_HERE',
            //user_agent: 'Your user agent', optional
            //proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321', optional
            //type: '1', // 1 - normal, 2 - invisible, 3 - v3, optional defaults to 1
            //v3_action: '',   // v3 action, optional
            //v3_min_score: '0.3', // if v3, score to target, optional
            //data_s: 'recaptcha data-s parameter used in loading reCAPTCHA',
            //affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolverapi.retrieve_captcha(id);
    }).then(function (data) {
        log('Recaptcha response: ' + data.gresponse);
        // log('Proxy status: ' + data.proxy_status);

        // return bestcaptchasolverapi.set_captcha_bad(captcha_id);         // set captcha bad
    }).catch(function (err) {
        log(err.message || err);
    }).then(function () {
        in_solving = false;
        log('Example finished !');
    });
}

// log what's happening to UI and console
function log(txt) {
    document.getElementById('log').value += txt + '\n';
    console.log(txt);
}
