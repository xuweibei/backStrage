/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';

setTimeout(() => {
    const render = Component => {
        ReactDOM.render(
            <Component/>,
            document.getElementById('root'),
        );
    };
    render(App);
}, 500);
