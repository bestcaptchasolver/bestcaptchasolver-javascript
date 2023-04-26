// check dashboard for accesskey
window.in_solving = false;

// for more details check https://bestcaptchasolver.com/captchabypass-api
function example_capy() {
    let ACCESS_TOKEN = 'ACCESS_TOKEN_HERE';
    var captcha_id = undefined;
    if(!in_solving) in_solving = true;
    else return log('Doing another task currently');

    document.getElementById('log').value = '';
    bestcaptchasolverapi.set_access_token(ACCESS_TOKEN);      // set token
    // balance
    bestcaptchasolverapi.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving capy');
        return bestcaptchasolverapi.submit_capy({
            page_url: 'PAGE_URL_HERE',
            site_key: 'SITE_KEY_HERE',
            // user_agent: 'your user agent',        // optional
            // proxy: 'user:pass@123.45.67.89:3031', // optional
            // affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolverapi.retrieve_captcha(id);
    }).then(function (data) {
        log('Capy response: ' + JSON.stringify(data.solution));
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
