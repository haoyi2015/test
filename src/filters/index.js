/**
 * 字符截取
 * @param  {any} 原值
 * @param  {any} 截取长度
 * @returns val
 */
export function limit(val, max, isDot) {
    if (!val) {
        return '';
    }
    isDot = isDot || false;
    return val.length > max ? val.substring(0, max) + (isDot ? '...' : '') : val;
}


/** 距离显示
 *  @param {int} url 距离显示
 */
export function distance(value) {
    if (value <= 0) {
        return '0';
    } else if (value < 1000) {
        return `${Math.floor(value)} m`;
    }
    return `${(value / 1000).toFixed(2)} km`;
}
