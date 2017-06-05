var isProduction = /\w+?\.(imike|shuime)\.com/.test(location.host);
var apiHost = isProduction ? '//fis.fangbaba.cc/' : '//fis.dev.fangbaba.cc/';
var weixinHost = isProduction ? '//weixin.imike.com/wechat/' : '//weixin.imike.cn/wechat/';
var appid = isProduction ? 'wx2d9d3daf15496f60' : 'wxb0f8a61e80048f38';

//模拟环境
var unapiHost = isProduction ? '//union.fangbaba.com/' : '//union.fangbaba.cc/';

export default {
    apiHost,
    weixinHost,
    appid,
    unapiHost
};

