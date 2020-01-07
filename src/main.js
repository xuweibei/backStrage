/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';


global.getUserToken = function (data) {
    window.localStorage.setItem('userToken', data);
    const render = Component => {
        ReactDOM.render(
            <Component/>,
            document.getElementById('root'),
        );
    };
    render(App);
};
