import {Fragment} from 'react';
import {HashRouter as Router, history} from 'react-router-dom';
import ScrollToTop from '../common/scroll-to-top/ScrollToTop'; // 页面跳转后滚动条恢复到顶部
import ErrorRoute from './error/route'; // 错误页面
import GoodsDeatilRouters from './goods/route';
import RootGrowRouters from './root-grow/route';
import SuperSearchRouters from './super-search/route';
import AgreeMentPage from './agree/route';

export const ViewRoutes = () => (
    <Router hashHistory={history}>
        <ScrollToTop>
            <Fragment>
                <ErrorRoute/>
                <GoodsDeatilRouters/>
                <RootGrowRouters/>
                <SuperSearchRouters/>
                <AgreeMentPage/>
            </Fragment>
        </ScrollToTop>
    </Router>
);
