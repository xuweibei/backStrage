import {currentHref} from './hrefCfg';

export const urlCfg = {
    orderDetail: currentHref.apiPath + 'order-detail', //线上订单详情
    selfOrderDetail: currentHref.apiPath + 'self-order-detail', //线下订单详情
    shopInfo: currentHref.apiPath + 'get-shopsetting', //店铺信息
    shopCertification: currentHref.apiPath + 'get-shop-auth', //店铺认证
    orderInfo: currentHref.apiPath + 'logistics-track' //物流信息
};
