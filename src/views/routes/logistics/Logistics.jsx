/*
* 物流页面
* */
import './Logistics.less';

const {urlCfg} = Configs;

export default class MyOrder extends BaseComponent {
    state = {
        orderInfo: {},
        slideShow: false
    }

    componentDidMount() {
        this.getOrderInfo();
        this.initMap();
    }

    initMap = () => {
        this.map = new window.BMap.Map('home');
        // FIXME: 经纬度不能写死
        //产品需求，固定地图
        const point = new window.BMap.Point(119.33022111, 26.04712550);
        this.map.centerAndZoom(point, 15);
        this.drawMap();
    };

    //获取物流信息
    getOrderInfo = () => {
        this.fetch(urlCfg.orderInfo, {data: {
            order_id: '2905',
            userToken: 'e9e71c6Yd7m5c1u608Gcc4x85G77704933df66a441e'
        }}).then(res => {
            this.setState({
                orderInfo: res.data
            });
        });
    }

    //绘制路线
    drawMap = () => {
        const walk = new window.BMap.WalkingRoute(this.map, {});
        //在walk实例对象中获取点数组
        walk.setSearchCompleteCallback(() => {
            const pts = walk.getResults().getPlan(0).getRoute(0).getPath();
            this.polyline = new window.BMap.Polyline(pts, {
                strokeColor: '#589EFF',
                strokeWeight: 3,
                strokeOpacity: 1,
                strokeStyle: 'solid',
                id: 'polyine'
            });
            this.map.addOverlay(this.polyline);
        });
        const start = new window.BMap.Point(119.33022111, 26.04712550);
        const end = new window.BMap.Point(119.3187300, 26.0354040);
        walk.search(start, end);
    }

    slideOut = (slideShow, e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        this.setState({
            slideShow
        });
    }

    render() {
        const {orderInfo, slideShow} = this.state;
        return (
            <div data-component="logistics" data-role="page" className="logistics">
                <div className="container">
                    <div id="home" style={{height: '100vh'}}/>
                </div>
                <div className="logistics-info-top">
                    <div className="logistics-info-top-container">
                        <div className="item">
                            <img src={require('../../../assets/images/goods.png')} alt=""/>
                        </div>
                        <div className="item">
                            <p>订单状态</p>
                            <p>物流单号：{orderInfo.express_no}</p>
                        </div>
                        <div className="item">
                            <div><div className="phone-call"/></div>
                            <p>联系物流</p>
                        </div>
                    </div>
                </div>
                <div className="logistics-info-bot" style={{bottom: slideShow ? '0' : '-280px'}} onClick={(e) => this.slideOut(true, e)}>
                    <div className="logistics-info-bot-container">
                        {
                            orderInfo.status === '6' && (
                                <div className="logistics-detail-container received">
                                    <div/>
                                    <div className="item-circle">收</div>
                                    <div>[收货地址]{orderInfo.area}</div>
                                </div>
                            )
                        }
                        {
                            orderInfo.express_content && orderInfo.express_content.data && orderInfo.express_content.data.map(item => (
                                <div className="logistics-detail-container" key={item.context}>
                                    <div>
                                        <p>{item.time.split(' ')[0]}</p>
                                        <p>{item.time.split(' ')[1]}</p>
                                    </div>
                                    <div className="item-circle"/>
                                    <div>{item.context}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="slide-close" onClick={(e) => this.slideOut(false, e)}>
                        <div className="slide-close-icon"/>
                        <p>收起物流详情</p>
                    </div>
                </div>
            </div>
        );
    }
}