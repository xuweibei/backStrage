import {Fragment} from 'react';
import {HashRouter as Router, history} from 'react-router-dom';
import ScrollToTop from '../common/scroll-to-top/ScrollToTop'; // 页面跳转后滚动条恢复到顶部
import ErrorRoute from './error/route'; // 错误页面
// import IncomeDetail from './income-detail/route';
import AgreeMentPage from './agree/route';
import OrderDetailPage from './order-detail/router';
import LogiisticsPage from './logistics/route';
import ShopInfoPage from './shop-info/route';

export const ViewRoutes = () => (
    <Router hashHistory={history}>
        <ScrollToTop>
            <Fragment>
                <ErrorRoute/>
                {/* <IncomeDetail/> */}
                <AgreeMentPage/>
                <OrderDetailPage/>
                <LogiisticsPage/>
                <ShopInfoPage/>
            </Fragment>
        </ScrollToTop>
    </Router>
);
