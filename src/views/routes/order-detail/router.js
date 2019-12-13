import {Route} from 'react-router-dom';
import OrderDetail from './OrderDetail';


const OrderDetailPage = () => (
    <React.Fragment>
        <Route path="/order-detail" component={OrderDetail}/>
    </React.Fragment>
);

export default OrderDetailPage;