//订单详情页，2019/11/19，楚小龙

import './OrderDetail.less';
import {Button} from 'antd-mobile';

const {urlCfg} = Configs;
const {getUrlParam} = Utils;

export default class OrderDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: {},
            id: decodeURI(getUrlParam('id', encodeURI(this.props.location.search)))
        };
    }

    componentDidMount() {
        this.getOrderDetail();
    }

    //获取线上订单详情
    getOrderDetail = () => {
        const {id} = this.state;
        this.fetch(urlCfg.orderDetail, {
            data: {id}
        }).then(res => {
            this.setState({
                orderDetail: res.data
            });
        });
    }

    //获取线下订单详情
    getSelfOrderDetail = () => {
        this.fetch(urlCfg.selfOrderDetail, {
            data: {
                id: '3430'
            }
        }).then(res => {
            this.setState({
                orderDetail: res.data
            });
        });
    }

    //可重用组件
    useMap = (infoObj) => {
        const {orderDetail} = this.state;
        const invoiceObj = [
            {title: '发票类型', value: orderDetail.invoice_type},
            {title: '抬头发票', value: orderDetail.head_type},
            {title: '企业', value: orderDetail.enterprise_name},
            {title: '纳税人识别号', value: orderDetail.tax_id},
            {title: '开户银行', value: orderDetail.bank},
            {title: '企业地址', value: orderDetail.enterprise_addr},
            {title: '银行账户', value: orderDetail.bank_card_no},
            {title: '企业电话', value: orderDetail.enterprise_phone}
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
                    <Button className="logistics">{orderDetail.if_express === '1' ? <span>物流详情</span> : <span>核销订单</span>}<div className="wuliu-icon"/></Button>
                </div>
                <div className="order-detail-body">
                    <div className="order-detail-body-top">
                        <div className="top-info">
                            <div className="user_name">
                                <span>{orderDetail.linkname}</span>
                                <span>{orderDetail.linktel}</span>
                            </div >
                            <p className="user_address">{orderDetail.address || orderDetail.white_start_time}</p>
                        </div>
                        <div className="phone-call"/>
                    </div>
                    <div className="order-detail-body-bot pd-l-r-40">
                        <span>备注</span>
                        <span>{orderDetail.remarks}</span>
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