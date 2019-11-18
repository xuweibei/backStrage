//商品详情页弹框，2019/10/24，楚小龙
import {Button, Modal} from 'antd-mobile';
import './GoodsModal.less';

const {urlCfg} = Configs;
const {isAndroid} = Utils;
const alert = Modal.alert;
export default class GoodsModal extends BaseComponent {
    //兑换优惠券
    forExchange = () => {
        const {goodsInfoParams, couponInfo, showModal} = this.props;
        this.fetch(urlCfg.exchangeCoupon, {
            data: {
                user_id: goodsInfoParams.id,
                goods_id: goodsInfoParams.goodId,
                types: goodsInfoParams.types,
                money: couponInfo.use_money
            }
        }).then(res => {
            showModal(false);
            if (res.data.bind === 2) { //未绑定
                alert(null, res.message, [
                    {text: '取消', onPress: () => {}},
                    {
                        text: '去绑定',
                        onPress: () => new Promise((resolve) => {
                            this.bindSmallProgram();
                            // Toast.info('onPress Promise', 1);
                            setTimeout(resolve, 1000);
                        })
                    }
                ]);
            } else {
                this.goToCamProgram();
            }
        });
    }

    //账号未绑定小程序
    bindSmallProgram = () => {
        const {goodsInfoParams} = this.props;
        if (isAndroid) {
            alert(1);
            window.native.turnBinding(`gh_631bf54a285c,pages/member/member?token=${goodsInfoParams.id}`);
        } else {
            window.webkit.messageHandlers.turnBinding.postMessage(`gh_631bf54a285c,pages/member/member?token=${goodsInfoParams.id}`);
        }
    }

    //立即兑换跳转小程序
    goToCamProgram = () => {
        const {goodsInfoParams} = this.props;
        if (isAndroid) {
            window.native.turnBinding(`gh_e8defccbe927,pages/mall/detail/detail?goodsId=${goodsInfoParams.goodId}`);
        } else {
            window.webkit.messageHandlers.turnBinding.postMessage(`gh_e8defccbe927,pages/mall/detail/detail?goodsId=${goodsInfoParams.goodId}`);
        }
    }

    render() {
        const {showModal, couponInfo} = this.props;
        return (
            <div className="goods-modal-container">
                <div className="goods-modal-mask" onClick={() => showModal(false)}/>
                {
                    couponInfo.images && couponInfo.images.bg
                    && (
                        <div className="goods-modal-content">
                            <div className="modal-content">
                                <img src={couponInfo && couponInfo.images && couponInfo.images.bg} alt=""/>
                                <div className="modal-content-data">
                                    {couponInfo.top_message}
                                </div>
                                <div className="modal-content-data-bottom">
                                    <div className="data-bottom-money">
                                        <p>{couponInfo.message}</p>
                                        <p>当前余额：{couponInfo.balance}元</p>
                                    </div>
                                    <Button onClick={this.forExchange}>立即兑换</Button>
                                </div>
                            </div>
                            <div className="modal-close">
                                <div className="modal-close-icon" onClick={() => showModal(false)}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}