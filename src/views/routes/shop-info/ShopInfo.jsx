//店铺信息页面，2019/11/22，楚小龙

import './ShopInfo.less';

const {urlCfg} = Configs;

export default class ShopInfo extends BaseComponent {
    state = {
        shopInfo: {} //店铺信息
    }

    componentDidMount() {
        this.getShopInfo();
    }

    //复用组件
    useComponent = (infoObj) => {
        const {shopInfo} = this.state;
        const shopInfoObj = [
            {title: '店铺名称', value: shopInfo.shopName},
            {title: '店铺类型', value: shopInfo.shop_type_name},
            {title: '主营类目', value: shopInfo.cate1},
            {title: '收款码折扣', value: shopInfo.discount},
            {title: '所在地区', value: shopInfo.area},
            {title: '店铺具体地址', value: shopInfo.address},
            {title: '营业时间', value: shopInfo.open_time + '至' + shopInfo.close_time},
            {title: '客服电话', value: shopInfo.csh_phone},
            {title: '商户负责人', value: shopInfo.linkName},
            {title: '商户负责人电话', value: shopInfo.phone},
            {title: '店铺简介', value: shopInfo.intro},
            {title: '商家图册', value: shopInfo.album && shopInfo.album.length > 0 && shopInfo.album.map(item => (<div key={item}><img src={item} alt=""/></div>))}
        ];
        const residentObj = [
            {title: '入住人姓名', value: shopInfo.re_name},
            {title: '入住人手机', value: shopInfo.phone},
            {title: '入驻时间', value: this.timestampToTime(shopInfo.crtdate)}
        ];
        return (
            infoObj === 0 ? (
                shopInfoObj.map(item => (
                    <div className="shop-info-body-item" key={item.title}>
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                    </div>
                ))
            ) : (
                residentObj.map(item => (
                    <div className="shop-info-body-item" key={item.title}>
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                    </div>
                ))
            )
        );
    }

  //获取店铺信息
  getShopInfo = () => {
      this.fetch(urlCfg.shopInfo).then(res => {
          this.setState({
              shopInfo: res.data
          });
      });
  }

  //时间戳转日期
   timestampToTime = (timestamp) => {
       const date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       const Y = date.getFullYear() + '-';
       const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
       const D = date.getDate() + ' ';
       return Y + M + D;
   }

   render() {
       const {shopInfo} = this.state;
       return (
           <div className="shop-info-container">
               <div className="shop-info-title">
                   {
                       shopInfo.logo && <img src={shopInfo.logo} alt=""/>
                   }
               </div>
               <div className="shop-info-body pd-l-r-40">
                   <div className="shop-info">
                       <h5 className="shop-info-header">店铺信息</h5>
                       <div className="shop-info-content shop-info-spec">
                           {this.useComponent(0)}
                       </div>
                   </div>
                   <div className="shop-info">
                       <h5 className="shop-info-header">入住人信息</h5>
                       <div className="shop-info-content shop-info-rz">
                           {this.useComponent(1)}
                       </div>
                   </div>
               </div>
           </div>
       );
   }
}