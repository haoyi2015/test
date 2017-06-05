export default {
    areaText: state => {
        let txt = '位置区域';
        if (state.area) {
            txt = state.area.name;
        }
        if (state.range) {
            /* eslint-disable */
            switch (state.range) {
                case 1000:
                    txt = '附近1km';
                    break;
                case 3000:
                    txt = '附近3km';
                    break;
                case 5000:
                    txt = '附近5km';
                    break;
                case 10000:
                    txt = '附近10km';
                    break;
                default:
                    txt = '全城';
                    break;
            }
            /* eslint-enable */
        }
        return txt;
    },
    cityCode: state => state.city && state.city.code,
    cityName: state => (state.city && state.city.name) || '定位中',
};

