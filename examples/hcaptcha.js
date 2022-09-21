// check dashboard for accesskey
window.in_solving = false;

// for more details check https://bestcaptchasolver.com/captchabypass-api
function example_hcaptcha() {
    let ACCESS_TOKEN = 'ACCESS_TOKEN_HERE';
    var captcha_id = undefined;
    if(!in_solving) in_solving = true;
    else return log('Doing another task currently');

    document.getElementById('log').value = '';
    bestcaptchasolverapi.set_access_token(ACCESS_TOKEN);      // set token
    // balance
    bestcaptchasolverapi.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving hCaptcha');
        return bestcaptchasolverapi.submit_hcaptcha({
            page_url: 'PAGE_URL_HERE',
            site_key: 'SITE_KEY_HERE',
            // invisible: 1,
            // payload: {rqdata: 'from web requests2'},
            // user_agent: 'your UA',
            // proxy: '12.34.54.56:1234'
            // affiliate_id: 'ID of affiliate'
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolverapi.retrieve_captcha(id);
    }).then(function (data) {
        log('hCaptcha response: ' + JSON.stringify(data.solution));
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
