//订单详情页，2019/11/19，楚小龙

import './OrderDetail.less';
import {Button, Modal} from 'antd-mobile';
import {showInfo, showSuccess} from '../../../utils/mixin';

const prompt = Modal.prompt;
const {urlCfg} = Configs;
const {getUrlParam, isAndroid} = Utils;

export default class OrderDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: {},
            id: decodeURI(getUrlParam('id', encodeURI(props.location.search))),
            type: decodeURI(getUrlParam('type', encodeURI(props.location.search)))  //1 为线上订单过来，2位线下订单过来
        };
    }

    componentDidMount() {
        const {type} = this.state;
        if (type === '1') {
            this.getOrderDetail();
            this.getOrderDetail();
        } else {
            this.getSelfOrderDetail();
            this.getSelfOrderDetail();
        }
    }

    //获取线上订单详情
    getOrderDetail = () => {
        const {id} = this.state;
        this.fetch(urlCfg.orderDetail, {
            data: {id}
        }).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    orderDetail: res.data || {}
                });
            }
        });
    }

    //获取线下订单详情
    getSelfOrderDetail = () => {
        const {id} = this.state;
        this.fetch(urlCfg.selfOrderDetail, {data: {id}}).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    orderDetail: res.data || {}
                });
            }
        });
    }

    //可重用组件
    useMap = (infoObj) => {
        const {orderDetail} = this.state;
        const invoiceObj = [
            {title: '发票类型', value: orderDetail.invoice && orderDetail.invoice.invoice_type},
            {title: '抬头发票', value: orderDetail.invoice && orderDetail.invoice.head_type},
            {title: '企业', value: orderDetail.invoice && orderDetail.invoice.enterprise_name},
            {title: '纳税人识别号', value: orderDetail.invoice && orderDetail.invoice.tax_id},
            {title: '开户银行', value: orderDetail.invoice && orderDetail.invoice.bank},
            {title: '企业地址', value: orderDetail.invoice && orderDetail.invoice.enterprise_addr},
            {title: '银行账户', value: orderDetail.invoice && orderDetail.invoice.bank_card_no},
            {title: '企业电话', value: orderDetail.invoice && orderDetail.invoice.enterprise_phone}
        ];
        const orderObj = [
            {title: '订单号', value: orderDetail.order_no},
            {title: '下单时间', value: orderDetail.crtdate},
            {title: '支付时间', value: orderDetail.pay_date}
        ];
        return (
            infoObj === 0 ? (invoiceObj.map(item => (
                <div className="invoice-info-body-item" key={item.title}>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                </div>
            ))) : (
                orderObj.map(item => (
                    <div className="invoice-info-body-item" key={item.title}>
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                    </div>
                ))
            ));
    }

    //打电话
    sellPhone = (phone) => {
        if (isAndroid) {
            window.android.giveCall(phone);
        } else {
            window.webkit.messageHandlers.giveCall.postMessage(JSON.stringify(phone));
        }
    }

    //前往物流页面
    goLogital = () => {
        const {id} = this.state;
        if (isAndroid) {
            window.android.goLogistics(id);
        } else {
            window.webkit.messageHandlers.goLogistics.postMessage(JSON.stringify(id));
        }
    }

    //核销订单
    writeOff = () => {
        const {id} = this.state;
        if (isAndroid) {
            window.android.writeOff(id);
        } else {
            window.webkit.messageHandlers.writeOff.postMessage(JSON.stringify(id));
        }
    }

    //关闭订单
    closeOrder = () => {
        const that = this;
        return prompt(
            '确定关闭订单？',
            '',
            [
                {text: '取消'},
                {text: '确定', onPress: value => that.mustSureClose(value)}
            ],
            'default', '', ['请输入关闭原因']
        );
    }

    //确定关闭订单
    mustSureClose = (value) => {
        if (!value) {
            showInfo('请输入关闭原因！');
            return;
        }
        const {id} = this.state;
        this.fetch(urlCfg.closeOrder, {data: {order_id: id, reason: value}}).then(res => {
            if (res && res.status === 0) {
                showSuccess('操作成功！');
                setTimeout(() => {
                    if (isAndroid) {
                        window.android.goBack();
                    } else {
                        window.webkit.messageHandlers.goBack.postMessage();
                    }
                }, 500);
            }
        });
    }

    render() {
        const {orderDetail} = this.state;
        return (
            <div className="order-detail-container">
                <div className="order-detail-top pd-l-r-40">
                    <div className="order-detail-top-left">
                        <p>{orderDetail.status_msg}</p>
                        {
                            orderDetail.restime && <p>倒计时：{orderDetail.restime}</p>
                        }
                    </div>
                    {
                        orderDetail.status > 2 && <Button className="btnStyle"><span onClick={this.goLogital}>物流详情</span><div className="wuliu-icon"/></Button>
                    }
                    {/* { // 二期功能 甘泽隆
                        orderDetail.status > 0 && orderDetail.status < 3 && <Button className="btnStyle"> <span onClick={this.writeOff}>核销订单</span></Button>
                    }
                    {
                        orderDetail.status < 2 && <Button className="btnStyle"> <span onClick={this.closeOrder}>关闭订单</span></Button>
                    } */}
                </div>
                <div className="order-detail-body">
                    <div className="order-detail-body-top">
                        <div className="top-info">
                            <div className="user_name">
                                <span>{orderDetail.nickname}</span>
                                <span>{orderDetail.linktel}</span>
                            </div >
                            <p className="user_address">{orderDetail.address || orderDetail.white_start_time}</p>
                        </div>
                        <div onClick={() => this.sellPhone(orderDetail.linktel)} className="phone-call"/>
                    </div>
                    <div className="order-detail-body-bot pd-l-r-40">
                        <span>备注</span>
                        <span>{orderDetail.remarks || '无'}</span>
                    </div>
                </div>
                <div className="order-detail-list pd-l-r-40">
                    <div className="list-header">
                        <div>
                            <img className="list-header-item" src={orderDetail.avatarUrl} alt=""/>
                            <span className="list-header-item">{orderDetail.no}</span>
                            <div className="list-header-item list-header-icon"/>
                        </div>
                        <div>{orderDetail.status_msg}</div>
                    </div>
                    <div className="list-body">
                        {
                            orderDetail.pr_list && orderDetail.pr_list.length > 0 && orderDetail.pr_list.map(item => (
                                <div key={item} className="list-body-item">
                                    <div className="list-body-item-left">
                                        <img src={item.picpath} alt=""/>
                                    </div>
                                    <div className="list-body-item-right">
                                        <p className="desc">{item.pr_title}</p>
                                        <div className="spec">
                                            <div className="spec-detail">
                                                {
                                                    item.property_content ? item.property_content.map(specs => <span key={specs}>{specs}</span>) : <span>{item.values_name}</span>
                                                }
                                            </div>
                                            <div>x{item.num}</div>
                                        </div>
                                        <div className="calc">
                                            <span>￥{item.single_price}</span>
                                            <span>记账量：{item.deposit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="list-footer">
                        <p>总记账量：{orderDetail.deposit}</p>
                        <p>共{orderDetail.pr_list && orderDetail.pr_list.length}件商品 合计：￥{orderDetail.price}</p>
                    </div>
                </div>
                {
                    orderDetail.invoice && (
                        <div className="invoice-info pd-l-r-40">
                            <h5 className="invoice-info-title">发票信息</h5>
                            <div className="invoice-info-body">
                                {this.useMap(0)}
                            </div>
                        </div>
                    )
                }
                <div className="order-info invoice-info pd-l-r-40">
                    <h5 className="invoice-info-title">订单信息</h5>
                    <div className="invoice-info-body">
                        {this.useMap(1)}
                    </div>
                </div>
            </div>
        );
    }
}