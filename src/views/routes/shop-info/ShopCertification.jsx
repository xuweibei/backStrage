//店铺认证页，2019/11/22，楚小龙

import {Fragment} from 'react';
import './ShopCertification.less';

const {urlCfg} = Configs;

export default class ShopCertification extends BaseComponent {
    state = {
        certificationInfo: {} //店铺认证信息
    }

    componentDidMount() {
        this.getCertification();
    }

    //获取店铺认证信息
    getCertification = () => {
        this.fetch(urlCfg.shopCertification, {
            data: {
                userToken: '498a12eKb3Ibe1g152Xc08Ab3mdd734843966b14483'
            }
        }).then(res => {
            this.setState({
                certificationInfo: res.data
            });
        });
    }

    render() {
        const {certificationInfo} = this.state;
        return (
            <div className="shop-certification-container">
                <div className="shop-certification-body">
                    <div className="shop-certification-title ta-c">
                        <h3>开店人基本信息</h3>
                    </div>
                    <div className="shop-ID-card pd-l-r-40">
                        <p className="sub-title">身份证照</p>
                        <div className="ta-c card-photo">
                            <img src={certificationInfo.idcard_front} alt=""/>
                            <img src={certificationInfo.hand_photo} alt=""/>
                            <img src={certificationInfo.idcard_back} alt=""/>
                        </div>
                    </div>
                    <div className="document-info pd-l-r-40">
                        <div className="documemt-info-item">
                            <span>姓名</span>
                            <span>{certificationInfo.mastar_name}</span>
                        </div>
                        <div className="documemt-info-item">
                            <span>身份证号</span>
                            <span>{certificationInfo.idcard}</span>
                        </div>
                        <div className="documemt-info-item">
                            <span>身份证有效期</span>
                            <span>{certificationInfo.idcard_exp}</span>
                        </div>
                    </div>
                    {
                        certificationInfo.cer_type === '1' && (
                            <Fragment>
                                <div className="shop-certification-title ta-c">
                                    <h3>个体工商户营业信息</h3>
                                </div>
                                <div className="shop-info-photo ta-c pd-l-r-40">
                                    <div>
                                        <p className="sub-title">营业执照</p>
                                        <img src={certificationInfo.logo} alt=""/>
                                    </div>
                                    <div className="run-passion-container">
                                        <div className="run-passion-item">
                                            <span>统一社会信用代码</span>
                                            <span>{certificationInfo.shop_lic}</span>
                                        </div>
                                        <div className="run-passion-item">
                                            <span>营业执照有效期</span>
                                            <span>{certificationInfo.shop_lic_exp}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="shop-certification-title ta-c">
                                    <h3>个体工商户证明材料</h3>
                                </div>
                                <div className="shop-info-photo ta-c pd-l-r-40">
                                    <div>
                                        <p className="sub-title">商户门头照</p>
                                        <img src={certificationInfo.logo} alt=""/>
                                    </div>
                                    <div>
                                        <p className="sub-title">商户店内照</p>
                                        <img src={certificationInfo.indoor} alt=""/>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    {
                        certificationInfo.cer_type !== '1'
                        && (
                            <Fragment>
                                <div className="shop-certification-title ta-c">
                                    {certificationInfo.cer_type === '0' && <h3>小微商户营业信息</h3>}
                                    {certificationInfo.cer_type === '2' && <h3>网店营业信息</h3>}
                                </div>
                                <div className="shop-info-photo ta-c pd-l-r-40">
                                    <div>
                                        <p className="sub-title">商户门头照</p>
                                        <img src={certificationInfo.logo} alt=""/>
                                    </div>
                                    <div>
                                        <p className="sub-title">商户店内照</p>
                                        <img src={certificationInfo.indoor} alt=""/>
                                    </div>
                                    <div>
                                        <p className="sub-title">商品照</p>
                                        <img src={certificationInfo.pr_img} alt=""/>
                                    </div>
                                </div>
                                <div className="shop-certification-title ta-c">
                                    <h3>个体工商户营业信息</h3>
                                </div>
                                <div className="personal-shop-info pd-l-r-40 ta-c">
                                    <div><div className="red-close"/>未认证</div>
                                    <p>（需提供经营者姓名和入住人一致的个体工商户营业信息）</p>
                                    <p>请前往PC端商家后台补充资料</p>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        );
    }
}