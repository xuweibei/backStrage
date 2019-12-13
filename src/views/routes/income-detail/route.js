import {Route} from 'react-router-dom';
import IncomeDetail from './IncomeDetail';


const IncomeDetailPage = () => (
    <React.Fragment>
        <Route path="/income-detail" component={IncomeDetail}/>
    </React.Fragment>
);

export default IncomeDetailPage;