import React from 'react';
import Main from './common/main';
import Transactions from './transactions';
import Information from './information';
import Disbursements from './disbursements';
import People from './people';
import Organizations from './organizations';
import Layers from './layers';
import Summary from './common/summary';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={browserHistory}>
                <Route component={Main} path='/'>
                    <Route path='/transactions' name='transactions' component={Transactions}/>
                    <Route path='/information' name='information' component={Information}/>
                    <Route path='/disbursements' name='disbursements' component={Disbursements}/>
                    <Route path='/people' name='people' component={People}/>
                    <Route path='/organizations' name='organizations' component={Organizations}/>
                    <Route path='/layers' name='layers' component={Layers}/> 
                    <IndexRoute component={Summary}/>
                </Route>
            </Router>
        );
    };

}