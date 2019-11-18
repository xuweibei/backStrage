//商品详情轮播图组件，2019/11/5，楚小龙
import './CarouselComponent.less';
// import WxImageViewer from 'react-wx-images-viewer';
import {Carousel} from 'antd-mobile';

export default class CarouselComponent extends BaseComponent {
    //开启大图
    openViewer = (index) => {
        this.setState({
            imgIndex: index,
            isOpen: true
        });
    }

    //关闭大图
    onCloseImg = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const {goodsPicture, showCarousel} = this.props;
        return (
            <div className="my-carousel-container">
                <Carousel className="my-carousel">
                    {
                        goodsPicture && goodsPicture.length > 0 && goodsPicture.map((item, index) => (
                            <div className="carousel-item" key={item + index.toString()}>
                                <img onClick={() => showCarousel(true)} src={item}/>
                            </div>
                        ))
                    }
                </Carousel>

            </div>
        );
    }
}