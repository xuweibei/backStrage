import {Route} from 'react-router-dom';
import AgreeMent from './index';
// import SuperSearchDetail from './SuperSearchDeatil';

const AgreeMentPage = () => (
    <React.Fragment>
        <Route path="/agree-ment" component={AgreeMent}/>
        {/* <Route path="/search-detail" component={SuperSearchDetail}/> */}
    </React.Fragment>
);

export default AgreeMentPage;