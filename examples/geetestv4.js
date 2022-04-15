// check dashboard for accesskey
window.in_solving = false;

// for more details check https://bestcaptchasolver.com/captchabypass-api
function example_geetestv4() {
    let ACCESS_TOKEN = 'ACCESS_TOKEN_HERE';
    var captcha_id = undefined;
    if(!in_solving) in_solving = true;
    else return log('Doing another task currently');

    document.getElementById('log').value = '';
    bestcaptchasolverapi.set_access_token(ACCESS_TOKEN);      // set token
    // balance
    bestcaptchasolverapi.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Submitted geetestv4');
        return bestcaptchasolverapi.submit_geetest_v4({
            domain: 'https://example.com',
            captchaid: '647f5ed2ed8acb4be36784e01556bb71',
            // affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolverapi.retrieve_captcha(id);
    }).then(function (data) {
        log('Geetestv4 solution: ' + JSON.stringify(data.solution));
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
