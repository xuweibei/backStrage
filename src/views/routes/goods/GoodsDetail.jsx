//商品详情页，2019/10/23，楚小龙

import GoodsModal from './GoodsModal';
import './GoodsDetail.less';
import CarouselComponent from './CarouselComponent';

const {getUrlParam} = Utils;
const {urlCfg} = Configs;
export default class GoodsDetail extends BaseComponent {
    constructor(props) {
        super(props);
        const {location: {search}} = props;
        this.state = {
            isModal: false, //弹出框
            goodsInfo: {}, //商品信息
            couponInfo: {}, //优惠券信息
            isBind: true, //是否已绑定
            isShowCarousel: false, //轮播图查看
            goodsInfoParams: {
                id: decodeURI(getUrlParam('userId', encodeURI(search))), //用户ID
                goodId: decodeURI(getUrlParam('goodId', encodeURI(search))), //京东商品ID
                skuId: decodeURI(getUrlParam('skuId', encodeURI(search))), //拼多多商品ID
                parameter: decodeURI(getUrlParam('parameter', encodeURI(search))), //判断商品类型
                types: decodeURI(getUrlParam('types', encodeURI(search))) //优惠券类型
            }
        };
    }

    componentDidMount() {
        this.getGoodsDetail();
    }

    //弹出框开关
    showModal = (isModal) => {
        if (isModal) { //模态框显示时才请求接口
            this.getBalance();
        }
        this.setState({
            isModal
        });
    }

    //是否绑定弹窗
    showBindModal = (isBind) => {
        this.setState({
            isBind
        });
    }

    //获取商品信息
    getGoodsDetail = () => {
        const {goodsInfoParams} = this.state;
        this.fetch(urlCfg.goodsDetail, {
            data: {
                user_id: goodsInfoParams.id,
                goods_id_list: goodsInfoParams.goodId,
                skuId: goodsInfoParams.skuId,
                parameter: goodsInfoParams.parameter
            }
        }).then(res => {
            this.setState({
                goodsInfo: res.data
            });
        });
    }

    //查询优惠券信息
    getBalance = () => {
        const {goodsInfoParams, goodsInfo} = this.state;
        this.fetch(urlCfg.getBalanceMoney, {
            data: {
                user_id: goodsInfoParams.id,
                money: goodsInfo.coupon_discount
            }
        }).then(res => {
            if (res.errno === 1) {
                this.showModal(false);
            }
            this.setState({
                couponInfo: res.data
            });
        });
    }

    //轮播图查看
    showCarousel = (isShowCarousel) => {
        this.setState({
            isShowCarousel
        });
    }

    render() {
        const {goodsInfo, isModal, couponInfo, goodsInfoParams, isShowCarousel} = this.state;
        console.log(goodsInfoParams, '看了法国');
        console.log(goodsInfo, '离开水电费');
        return (
            <div className="goods-detail-container">
                <div className={isShowCarousel ? 'show-carousel goods-detail-top' : 'goods-detail-top'}>
                    {
                        isShowCarousel && (
                            <div
                                className="carousel-mask"
                                onClick={() => this.showCarousel(false)}
                                style={{height: window.screen.height + 'px'}}
                            />
                        )
                    }
                    <CarouselComponent showCarousel={this.showCarousel} goodsPicture={goodsInfo.goods_gallery_urls}/>
                </div>
                <div className="goods-detail-bottom">
                    <div className="goods-detail-bottom-part1 bgcw">
                        <div className="part1-top pd30">
                            <span className="part1-top-bargin">惠</span>
                            <span>{goodsInfo.goods_title}</span>
                        </div>
                        <div className="part1-bottom pd30">
                            <div className="part1-bottom-title">
                                <div className="bottom-money">
                                    <span>￥{goodsInfo.now_price}</span>
                                    <span>券后价</span>
                                    <span>原价￥{goodsInfo.min_group_price}元</span>
                                </div>
                                <div className="bottom-num"/>
                            </div>
                            {/* <div className="part1-bottom-picture">
                                <img src={require('../../../assets/images/bg.png')} alt=""/>
                                <span className="bottom-picture-left">{goodsInfo.cam_message}</span>
                                <span className="bottom-picture-right">
                                    查看权益
                                    <img className="bottom-picture-right-icon" src={require('../../../assets/images/icon-right.png')} alt=""/>
                                </span>
                            </div> */}
                        </div>
                    </div>
                    <div className="goods-detail-bottom-part2 bgcw pd30 mgt10">
                        <div className="bottom-part2-picture">
                            <div className="picture-title">
                                <div className="picture-left">
                                    <p>{goodsInfo.coupon_discount}元优惠券</p>
                                    <p>有效期： {goodsInfo.coupon_start_time}-{goodsInfo.coupon_end_time}</p>
                                </div>
                                <div className="picture-right" onClick={() => { this.showModal(true) }}>立即兑换</div>
                            </div>
                        </div>
                        <div className="bottom-part2-title">优惠券剩余数量：{goodsInfo.coupon_remain_quantity}/{goodsInfo.coupon_total_quantity}</div>
                    </div>
                    <div className="goods-detail-bottom-part3 bgcw pd30 mgt10">
                        <div className="bottom-part3-title pd30">
                            <span>推荐</span>
                            <span>{goodsInfo.goods_desc}</span>
                        </div>
                        <div className="bottom-part3-picture">
                            {
                                goodsInfo.goods_gallery_urls && goodsInfo.goods_gallery_urls.map((item, index) => (
                                    <img key={item + index.toString()} src={item} alt="图片"/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    isModal && (
                        <GoodsModal
                            showModal={this.showModal}
                            couponInfo={couponInfo}
                            showBindModal={this.showBindModal}
                            goodsInfoParams={goodsInfoParams}
                        />
                    )
                }
            </div>
        );
    }
}
