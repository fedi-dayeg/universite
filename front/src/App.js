import * as React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {NotificationContainer} from 'react-notifications';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-notifications/lib/notifications.css';

/* components...*/

const Dashboard = React.lazy(() => import('./views/index'))

const loading = () => <div className="d-flex justify-content-center">
    <Loader type="TailSpin"
            color="#00BFFF"
            height="100"
            width="100"/>
</div>

export class App extends React.Component {
    constructor(props) {
        super(props)
    }

    loggedIn = false

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Router>
                    <React.Suspense fallback={loading()}>
                  
                    
                           
                        <Route path="/"
                               render={(props) => (<Dashboard {...props}/>)}/>
                  
             
                    
                    </React.Suspense>
                </Router>
                
            <NotificationContainer/>
            </div>
        )
    }
}

export default App;
