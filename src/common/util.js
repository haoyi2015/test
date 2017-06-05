
export function getStore(key) {
    let val;
    try {
        val = localStorage.getItem(key);
    } catch (e) {
        // eslint-disable-next-line
        console.log('no storage');
    }
    if (!val) {
        return val;
    }
    return JSON.parse(val);
}

export function setStore(key, val) {
    var sval = JSON.stringify(val);
    try {
        localStorage.setItem(key, sval);
    } catch (e) {
        // eslint-disable-next-line
        console.log('no storage');
    }
}

export const os = {
    ua: navigator.userAgent,
    wechat() { return this.ua.match(/(MicroMessenger)\/([\d.]+)/i); },
    android() { return this.ua.match(/(Android);?[\s/]+([\d.]+)?/); },
    ios() { return this.ua.match(/(iPhone\sOS)\s([\d_]+)/); },
};

let getImageUrlList = (urlList) => {
    let urlRes = [];
    urlList.forEach((url) => {
        if (url) {
            urlRes.push(url);
        }
    });
    return urlRes;
};

export function getHotelImage(urls, key) {
    // url => 为图片的集合   key => 为限定截取集合里面某个字段下面的图片
    var urlsObj = urls;
    var res = [];
    if (!urls) return [];
    if (typeof (urls) !== 'object') {
        urlsObj = JSON.parse(urlsObj);
    }
    if (key) {
        if (urlsObj[key] && urlsObj[key].length) {
            res = res.concat(getImageUrlList(urlsObj[key]));
        }
    } else {
        Object.keys(urlsObj).forEach((val) => {
            res = res.concat(getImageUrlList(urlsObj[val]));
        });
    }
    return res;
}
export function checkNull(str) {
    return (!str || !str.replace(/\s+/g, ''));
}

/**
 * 检测手机号格式
 * @param phone
 */
export function checkPhone (phone){
    return /^[1][0-9]{10}$/.test(phone);
}