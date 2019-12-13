import {Route} from 'react-router-dom';
import Logistics from './Logistics';


const LogisticsPage = () => (
    <React.Fragment>
        <Route path="/logistics" component={Logistics}/>
    </React.Fragment>
);

export default LogisticsPage;