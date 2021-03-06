export default async (type = 'GET', url = '', data = {}, cors= '', method = 'fetch') => {
    type = type.toUpperCase();

    if (type === 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += `${key}=${data[key]}&`;
        });

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = `${url}?${dataStr}`;
        }
    }

    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/x-www-form-urlencoded',
            // },
            mode: cors =='nocors'?'no-cors':'cors',
            cache: 'force-cache',
        };

        if (type === 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: typeof data =='object'?JSON.stringify(data) : data
            });
        }

        let response = await fetch(url, requestConfig);
        let responseJson = await response.json();
        return responseJson;
    }

    return new Promise((resolve, reject) => {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            /* eslint-disable */
            requestObj = new ActiveXObject();
            /* eslint-enable */
        }

        let sendData = '';
        if (type === 'POST') {
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState === 4) {
                if (requestObj.status === 200) {
                    let obj = requestObj.response;
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    resolve(obj);
                } else {
                    reject(requestObj);
                }
            }
        };
    });
};
