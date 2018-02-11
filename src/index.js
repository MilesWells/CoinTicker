import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-materialize/'
import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Router, Switch } from 'react-router-dom';
import loading from './components/app/loading.svg';
import Auth from './services/auth';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <img src={loading} alt="loading"/>
                }} />
                <Route render={() => <App auth={auth} history={history} />} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
