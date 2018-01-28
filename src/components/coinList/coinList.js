import React from 'react';
import { connect } from 'react-redux';
import { fetchCoinListAsyncDispatcher } from './coinList.reducer';
import { Link } from 'react-router-dom';
import PriceLabel from '../priceLabel/priceLabel';
import { Grid, Paper, TextField } from 'material-ui';

class CoinList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            filteredTickers: props.coinList ? props.coinList.tickers : [],
            tickerFilter: ''
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            filteredTickers: newProps.coinList.tickers
        });
    }

    handleChange = event => {
        let filter = event.target.value.toLowerCase();
        const filteredTickers = this.props.coinList.tickers.filter(ticker => ticker.name.toLowerCase().includes(filter) || ticker.symbol.toLowerCase().includes(filter));
        this.setState({ filteredTickers });
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        id="tickerFilter"
                        label="Search Tickers"
                        onChange={this.handleChange}
                        margin="normal"
                    />
                </Grid>
                <br/>
                <Grid container>
                    {this.state.filteredTickers.map(ticker => (
                        <Grid item md={2} sm={3} xs={4} key={ticker.id}>
                            <Paper>
                                <h4>
                                    <Link to={`/coins/${ticker.symbol}`}>{ticker.name} - {ticker.symbol}</Link>
                                </h4>

                                <div><PriceLabel decimals={6} price={ticker.price_usd} symbol="$"/></div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }
}

export default connect(
    (state) => ({
        coinList: state.coinList
    }),
    {
        fetchCoinListAsyncDispatcher
    }
)(CoinList);