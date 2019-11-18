//权益升级页，2019/10/23，楚小龙
import './RootGrow.less';
import {Button} from 'antd-mobile';

const {getUrlParam, isAndroid} = Utils;
const {urlCfg} = Configs;
export default class RootGrow extends BaseComponent {
    state = {
        rootInfo: {} //用户信息
    }

    componentDidMount() {
        const id = decodeURI(getUrlParam('userId', encodeURI(this.props.location.search)));
        this.getInfo(id === 'null' ? '' : id);
    }

    //权益升级图片获取
    getInfo = (id) => {
        this.fetch(urlCfg.rootGrow, {
            data: {user_id: id}
        }).then(res => {
            this.setState({
                rootInfo: res.data
            });
        });
    }

    //立即成为商家
    becomeShoper = () => {
        const userId = decodeURI(getUrlParam('userId', encodeURI(this.props.location.search)));
        if (isAndroid) {
            window.native.becomeShoper(`gh_e8defccbe927,pages/member/member?token=${userId}&programName=ttk`);
        } else {
            window.webkit.messageHandlers.becomeShoper.postMessage(`gh_e8defccbe927,pages/member/member?token=${userId}&programName=ttk`);
        }
    }

    //立即申请
    immediate = () => {
        if (isAndroid) {
            window.native.immediate();
        } else {
            window.webkit.messageHandlers.immediate.postMessage('我是js传递过来的数据');
        }
    }

    render() {
        const {rootInfo} = this.state;
        return (
            <div className="root-grow-container">
                <div className="root-grow-container-part1 pdt40">
                    <div className="part1-logo mgb20">
                        <img src={rootInfo.icon && rootInfo.icon.head_pic} alt=""/>
                    </div>
                    <p className="part1-name mgb20">{rootInfo.config && rootInfo.config.nick_name}</p>
                    <p className="part1-level mgb20">{rootInfo.config && rootInfo.config.huiyuan}</p>
                </div>
                <div className="root-grow-container-part2 pdl-r-30">
                    <img src={rootInfo.icon && rootInfo.icon.shoper} alt=""/>
                    <Button onClick={this.becomeShoper}>立即成为商家</Button>
                </div>
                <div className="root-grow-container-part3 pdl-r-30">
                    <img src={rootInfo.icon && rootInfo.icon.extension} alt=""/>
                    <Button onClick={this.immediate}>立即申请</Button>
                </div>
            </div>
        );
    }
}