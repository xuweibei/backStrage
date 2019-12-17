import axios from 'axios';
import {store} from '../redux/store';
import {baseActionCreator as actionCreator} from '../redux/baseAction';
import {showFail} from '../utils';

const {CancelToken} = axios;
const {appHistory} = Utils;
const {MESSAGE} = Constants;

//拦截请求
axios.interceptors.request.use(config => {
    if (!config.data) config.data = {};
    alert(window.localStorage.getItem('zpyg_userToken'));
    config.data.append('userToken', window.localStorage.getItem('zpyg_userToken'));
    return config;
}, error => Promise.reject(error));

//拦截响应
axios.interceptors.response.use(response => {
    if (response.data.status === 100 || response.data.status === 101) {
        showFail('token过期');
    }
    return response;
}, error => Promise.reject(error));
const source = CancelToken.source(); //初始化source对象

export const fetch = (url, data = {}) => new Promise((resolve, reject) => {
    if (url) {
        store.dispatch(actionCreator.showLoading());
        const datas = new FormData();
        if (data) {
            for (const i in data.data) {
                if (data.data[i]) {
                    datas.append(i, data.data[i]);
                }
            }
        }
        axios.post(url, datas, {
            cancelToken: new CancelToken(((c) => {
                source.cancel(c);
            }))
        }).then(response => {
            if (response) {
                if (response.data.status === 0) {
                    resolve(response.data);
                } else if (response.data.status === 1) {
                    showFail(response.message);
                    resolve(response.data);
                }
            }
        }).catch(error => {
            console.log(error, '接口错误信息'); // 错误捕获统一处理
            const code = [500, 501, 502, 503, 504, 505];
            store.dispatch(actionCreator.hideLoading());
            if (error.message === 'Network Error') {
                showFail(MESSAGE.Network_Error);
                appHistory.replace('/network-error');
            } else if (error.response && code.indexOf(error.response.status) !== -1) {
                appHistory.replace('/server-error');
            }
            reject(error);
        }).then(() => {
            store.dispatch(actionCreator.hideLoading());
        });
    } else {
        showFail(MESSAGE.No_Url);
    }
});

export const abort = () => new CancelToken(((c) => {
    source.cancel(c);
}));