import React from 'react';
import './app.css';
import CoinList from '../coinList/coinList';
import CoinDetails from '../coinDetails/coinDetails';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCoinListAsyncDispatcher } from '../coinList/coinList.reducer';
import { Button } from 'material-ui';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.auth.isAuthenticated()
        }
    }

    componentWillMount() {
        this.setState({ isLoggedIn: this.props.auth.isAuthenticated() });
    }

    async componentDidMount() {
        await this.props.fetchCoinListAsyncDispatcher(2000);
    }

    logout() {
        this.props.auth.logout();
        this.setState({ isLoggedIn: this.props.auth.isAuthenticated() });
    }

    login() {
        this.props.auth.login();
    }

    render() {
        return (
            <div className="App">
                <Router history={this.props.history}>
                    <React.Fragment>
                        <Link to="/coins">Coin Ticker</Link>
                        {!this.state.isLoggedIn && (<Button onClick={this.login.bind(this)}>Log In</Button>)}
                        {this.state.isLoggedIn && (<Button onClick={this.logout.bind(this)}>Log Out</Button>)}
                        <Switch>
                            <Route exact path="/coins" component={CoinList}/>
                            <Route exact path="/coins/:coinId" component={CoinDetails}/>
                            <Redirect to="/coins"/>
                        </Switch>
                    </React.Fragment>
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
