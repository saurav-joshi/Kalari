import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home'
/*import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';*/
import Source from './Source'
import Sink from './Sink'
import Summary from './Summary'
import DataPipeline from './DataPipeline'
import DataLakeHome from './DataLakeHome'
import DataRedactionHome from './DataRedactionHome'
import Tables from './Tables'
import Columns from './Columns';
import DashboardHome from './DashboardHome';
import Compartment from './Compartment'
const App = () => {
    return (
        <React.Fragment>
            <Router>

                <Switch>
                    <Route exact path="/" component={DashboardHome} />
                    <Route exact path="/home" component={Home} />
                    {/*<Route exact path="/compartment" component={Compartment} />*/}
                    <Route exact path="/datalake" component={DataLakeHome} />
                    <Route exact path="/dataredaction" component={DataRedactionHome} />
                    <Route exact path="/showtables" component={Tables} />
                    <Route exact path="/showcolumns" component={Columns} />
                    <Route exact path="/source" component={Source} />
                    <Route exact path="/datapipeline" component={DataPipeline} />
                    <Route exact path="/sink" component={Sink} />
                    <Route exact path="/compartment" component={Compartment} />
                    <Route exact path="/summary" component={Summary} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;