window.bestcaptchasolver_config = {
    BASE_URL: 'https://bcsapi.xyz/api'
};

window.bestcaptchasolverapi = {};

/**
 * Set access token
 * @param access_token
 */
bestcaptchasolverapi.set_access_token = function (access_token) {
    window.bestcaptchasolver_config.access_token = access_token;
};

/**
 * Set affiliate id
 * @param aff_id
 */
bestcaptchasolverapi.set_affiliate_id = function (aff_id) {
    window.bestcaptchasolver_config.affiliate_id = aff_id;
};

/**
 * Get account balance
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.account_balance = function () {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        var data = {}, url = undefined;
        url = bc.BASE_URL + '/user/balance?access_token=' + bc.access_token;
        $.get(url).done(function (resp) {
            return resolve(resp.balance);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit image captcha
 * @param opts
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_captcha = function (opts) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        var data = {access_token: bc.access_token}, url = undefined;
        url = bc.BASE_URL + '/captcha/image';
        data.b64image = opts.b64image;
        data.case_sensitive = opts.case_sensitive;
        if(bc.affiliate_id) data.affiliate_id = bc.affiliate_id;
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit reCAPTCHA
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_recaptcha = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/recaptcha';
        if(bc.affiliate_id) data.affiliate_id = bc.affiliate_id;
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Retrieve captcha text or gresponse using ID
 * @param id
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.retrieve_captcha = function (id) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        var url = bc.BASE_URL + '/captcha/' + id + '?access_token=' + bc.access_token;
        // check progress method
        function check_progress() {
            $.get(url).done(function (resp) {
                // still pending ?
                if (resp.error) return reject(resp.error);
                if (resp.status === 'pending') return setTimeout(check_progress, 3000);        // recheck in 3000 millis
                return resolve(resp);
            }).fail(function (err) {
                return reject(err.responseJSON.error);
            });
        }

        check_progress();       // run it
    });
};

/**
 * Set captcha bad
 * @param id
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.set_captcha_bad = function (id) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        var data = {access_token: bc.access_token};
        var url = bc.BASE_URL + '/captcha/bad/' + id;
        // check progress method
        function check_progress() {
            $.post(url, data).done(function (resp) {
                // still pending ?
                if (resp.status === 'pending') return setTimeout(check_progress, 3000);        // recheck in 3000 millis
                return resolve(resp);
            }).fail(function (err) {
                return reject(err.responseJSON.error);
            });
        }

        check_progress();       // run it
    });
};