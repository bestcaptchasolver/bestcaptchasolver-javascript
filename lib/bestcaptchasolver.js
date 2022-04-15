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
        opts.access_token = bc.access_token;
        const url = bc.BASE_URL + '/captcha/image';
        $.post(url, opts).done(function (resp) {
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
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit GeeTest
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_geetest = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/geetest';
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit Capy
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_capy = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/capy';
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit geetest
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_geetest = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/geetest';
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit geetestv4
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_geetest_v4 = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/geetestv4';
        $.post(url, data).done(function (resp) {
            return resolve(resp.id);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};

/**
 * Submit FunCaptcha
 * @param data
 * @returns {Promise<any>}
 */
bestcaptchasolverapi.submit_funcaptcha = function (data) {
    var bc = bestcaptchasolver_config;    // get config obj
    return new Promise((resolve, reject) => {
        data.access_token = bc.access_token;
        var url = bc.BASE_URL + '/captcha/funcaptcha';
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
        $.post(url, data).done(function (resp) {
            return resolve(resp);
        }).fail(function (err) {
            return reject(err.responseJSON.error);
        });
    });
};
