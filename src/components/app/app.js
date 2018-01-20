import React from 'react';
import './app.css';
import MyConnectedComponent from '../myConnectedComponent/myConnectedComponent';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={MyConnectedComponent}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
