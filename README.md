bestcaptchasolver-client - Bestcaptchasolver JS client API library
=========================================

Bypass image captcha and reCAPTCHA with bestcaptchasolver service, JS library

## Installation

    npm install bestcaptchasolver-client

or

    git clone https://github.com/bestcaptchasolver/bestcaptchasolver-javascript

## Usage

Promises are used inside the library, for better code management

Simply require the module, set the auth details and start using the captcha service:

``` javascript
<!-- Load jQuery (dependency) -->
<script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- Load the API library -->
<script src="../lib/bestcaptchasolver.js"></script>
```

Set access token, before using the library

``` javascript
bestcaptchasolverapi.set_access_token('access token from /account');
```


**Get balance**

``` javascript
bestcaptchasolverapi.account_balance().then(function (balance) {
    console.log('Balance: $', balance);
})
```

**Submit image captcha**

The submission of image captcha is done by sending us the image as a b64 encoded string.

``` javascript
bestcaptchasolverapi.submit_captcha({
    b64image: captcha,
    // is_case: true,         // case sensitive, default: false, optional
    // is_phrase: true,       // contains at least one space, default: false, optional
    // is_math: true,         // math calculation captcha, default: false, optional
    // alphanumeric: 2,        // 1 (digits only) or 2 (letters only), default: all characters
    // minlength: 2,           // minimum length of captcha text, default: any
    // maxlength: 3,           // maximum length of captcha text, default: any
    // affiliate_id: 'ID of affiliate'       // default: None, optional
}).then(function (id)) { /* use id to retrieve text */ };
```

**Submit reCAPTCHA**

The `page_url` and `site_key` are the only requirements. There are other optional parameters though.

``` javascript
bestcaptchasolverapi.submit_recaptcha({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // other parameters
    // -------------------------------------------
    // reCAPTCHA type(s) - optional, defaults to 1
    // -------------------------------------------
    // 1 - v2
    // 2 - invisible
    // 3 - v3
    // 4 - enterprise v2
    // 5 - enterprise v3
    //
    // type: '1',
    //
    // user_agent: 'Your user agent',
    // proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',
    // v3_action: '',   // v3 action
    // v3_min_score: '0.3', // if v3, score to target
    // data_s: 'recaptcha data-s parameter used in loading reCAPTCHA',
    // cookie_input: 'a=b;c=d',       // used in reCAPTCHA solving, optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve response */ };
```

Just like the image submission method, this method also returns an ID, which is then used
to get the text or gresponse.

**Submit Geetest**
- domain
- gt
- challenge

```javascript
bestcaptchasolverapi.submit_geetest({
    domain: 'DOMAIN_HERE',
    gt: 'GT_HERE',
    challenge: 'CHALLENGE_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Submit Capy**
- page_url
- site_key

```javascript
bestcaptchasolverapi.submit_capy({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Submit hCaptcha**
- page_url
- site_key

```javascript
bestcaptchasolverapi.submit_hcaptcha({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Submit FunCaptcha (Arkose Labs)**
- page_url
- s_url
- site_key

```javascript
bestcaptchasolverapi.submit_funcaptcha({
    page_url: 'https://abc.com',
    s_url: 'https://api.arkoselabs.com',
    site_key: '11111111-1111-1111-1111-111111111111',
    // data: '{"x":"y"}',  // optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Retrieve**

Retrieval is done by passing the ID, for all captchas

``` javascript
bestcaptchasolverapi.retrieve_captcha(id).then(function (data) { console.log(JSON.stringify(data)); });
```

This method returns an object, with the `text` attribute for image captcha or `gresponse` if submission was done for reCAPTCHA
or `solution` for geetest and capy

**If reCAPTCHA is submitted with proxy, get proxy status**

```javascript
log('Recaptcha response: ' + data.gresponse);
log('Proxy status: ' + data.proxy_status);
```

**Set captcha bad**

```javascript
bestcaptchasolverapi.set_captcha_bad(captcha_id);
```


## Examples
Check the `examples` folder

## License
API library is licensed under the MIT License

## More information
More info about the API parameters can be found [here](https://bestcaptchasolver.com/captchabypass-api)


<sup><sub>captcha, bypasscaptcha, decaptcher, decaptcha, 2captcha, deathbycaptcha, anticaptcha, 
bypassrecaptchav2, bypassnocaptcharecaptcha, bypassinvisiblerecaptcha, captchaservicesforrecaptchav2, 
recaptchav2captchasolver, googlerecaptchasolver, recaptchasolverpython, recaptchabypassscript</sup></sub>

