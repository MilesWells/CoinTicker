import React from 'react';
import './app.css';
import CoinList from '../coinList/coinList';
import CoinDetails from '../coinDetails/coinDetails';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { fetchCoinListAsyncDispatcher } from '../coinList/coinList.reducer';

const history = createBrowserHistory();

class App extends React.Component {
    async componentDidMount() {
        await this.props.fetchCoinListAsyncDispatcher();
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/coins" component={CoinList}/>
                        <Route exact path="/coins/:coinId" component={CoinDetails}/>
                        <Redirect to="/coins"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    {
        fetchCoinListAsyncDispatcher
    }
)(App);
