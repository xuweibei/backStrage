//收入详情页，2019/11/19，楚小龙
import './IncomeDetail.less';

export default class IncomeDetail extends BaseComponent {
    render() {
        const listCont = [
            {title: '交易时间', cont: '2019-10-12 23:00:12'},
            {title: '支付方式', cont: 'CAM消费'},
            {title: '订单编号', cont: 4654534345},
            {title: '订单来源', cont: '线上'},
            {title: 'UID', cont: 4654455}
        ];
        return (
            <div className="income-detail-container">
                <div className="income-detail-top">
                    <p>56546</p>
                    <p>收款金额（元）</p>
                </div>
                <div className="income-detail-bot">
                    {
                        listCont.map(item => (
                            <div key={item.cont} className="income-detail-bot-item">
                                <span>{item.title}</span>
                                <span>{item.cont}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}