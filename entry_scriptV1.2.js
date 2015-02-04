var active = 1;
var init_delay;
var init_default;
jQuery(document).ready(function () {
    adfly_id = parseInt(adfly_id);
    frequency_cap = parseInt(frequency_cap);
    frequency_delay = parseInt(frequency_delay);
    adfly_cookie('website_' + adfly_id, null);
    if (adfly_advert == 'intz') {
        init_default = 3;
    } else {
        init_default = 0;
    } if (typeof init_delay === 'undefined') {
        init_delay = init_default;
    }
    init_delay = parseInt(init_delay);
    if (isNaN(init_delay)) init_delay = init_default;
    if (init_delay < 3) init_delay = init_default;
    setTimeout("start();", init_delay * 1000);
    if (frequency_delay < 1) frequency_delay = 1;
    if (adfly_cookie('pub_' + adfly_id) == null) {
        var h = new Date();
        var i = h.getTime() + 86400000;
        h.setTime(i);
        adfly_cookie("pub_" + adfly_id, '0*' + i, {
            expires: h
        });
    }
    if (typeof adfly_domain === 'undefined') {
        var j = 'adf.ly';
    } else {
        var j = adfly_domain;
    }
    
    var requested_protocol = 'http';
    if (typeof(adfly_protocol) === 'string') {
        if (adfly_protocol == 'https') {
            requested_protocol = 'https';
        } else {
            requested_protocol = 'http';
        }
    }

    jQuery(document).mousemove(function (e) {
        if (active == 0) {
            active = 1;
            if (adfly_cookie('pub_' + adfly_id) != null) {
                var a = adfly_cookie("pub_" + adfly_id);
                var b = a.split('*');
                var c = b[1];
                var d = parseInt(b[0]);
                var f = adfly_cookie('ad_locked');
                if (d < frequency_cap && f != 1) {
                    var g = new Date();
                    g.setTime(g.getTime() + (frequency_delay * 60 * 1000));
                    adfly_cookie('ad_locked', 1, {
                        expires: g
                    });
                    g.setTime(c);
                    adfly_cookie('pub_' + adfly_id, (d + 1) + '*' + c, {
                        expires: g
                    });
                    top.location.href = requested_protocol + '://' + j + '/' + adfly_id + '/' + adfly_advert + '/' + window.location
                }
            }
        }
    })
});

function start() {
    active = 0
}