import { os } from './util';
import { wechatConfig } from '../service/';

const ready = (callback) => {
    if (!os.wechat()) {
        return;
    }

    if (window.wxIsReady) {
        if (callback) {
            callback();
        }
        return;
    }

    let param = {};
    param.url = encodeURIComponent(`${location.protocol}//${location.host}${location.pathname}${location.search}`);

    wechatConfig(param)
        .then((res) => {
            var config = res || {};
            /* eslint-disable */
            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timestamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: [
                    'getLocation',
                    'chooseImage',
                    'uploadImage',
                    'downloadImage',
                    'previewImage',
                    // 'chooseWXPay'
                ],
            });

            wx.ready(() => {
                window.wxIsReady = true;
                callback && callback();
            });

            wx.error((err) => {
                window.wxIsReady = false;
            });
            /* eslint-enable */
        });
};


const getLocationFromBOM = (success, fail) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
            success(data.coords);
        }, (error) => {
            /* eslint-disable */
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log('用户拒绝位置请求.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log('地理位置不可用.');
                    break;
                case error.TIMEOUT:
                    console.log('请求地理位置超时.');
                    break;
                case error.UNKNOWN_ERROR:
                    console.log('未知错误.');
                    break;
                default:
                    console.log('未知错误.');
            }
            /* eslint-enable */
            fail('获取地理位置失败！');
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 * 60 });
    }
};

const getCoords = (success, fail) => {
    if (os.wechat()) {
        ready(() => {
            /* eslint-disable */
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success(data) {
                    success && success(data.res || data);
                },
                fail(err) {
                    fail && fail('error');
                },
            });
            /* eslint-enable */
        });
    } else {
        getLocationFromBOM(success, fail);
    }
};

export {
    getCoords,
    getLocationFromBOM,
};
