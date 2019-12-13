import {Route} from 'react-router-dom';
import ShopInfo from './ShopInfo';
import ShopCertification from './ShopCertification';


const ShopInfoPage = () => (
    <React.Fragment>
        <Route path="/shop-info" component={ShopInfo}/>
        <Route path="/shop-certification" component={ShopCertification}/>
    </React.Fragment>
);

export default ShopInfoPage;