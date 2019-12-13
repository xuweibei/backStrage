import axios from 'axios';
import {store} from '../redux/store';
import {baseActionCreator as actionCreator} from '../redux/baseAction';

const {CancelToken} = axios;
const {appHistory, showFail} = Utils;
const {MESSAGE} = Constants;

//拦截请求
axios.interceptors.request.use(config => config, error => Promise.reject(error));

//拦截响应
axios.interceptors.response.use(({data}) => data, error => Promise.reject(error));

const source = CancelToken.source(); //初始化source对象

export const fetch = (url, data) => new Promise((resolve, reject) => {
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
                if (response.status === 0) {
                    resolve(response);
                } else if (response.status === 1) {
                    showFail(response.message);
                    resolve(response);
                }
            }
        }).catch(error => {
            console.log(error); // 错误捕获统一处理
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