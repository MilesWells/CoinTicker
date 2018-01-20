import React from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Paper, TextField } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import { fetchCoinListAsyncDispatcher } from './coinList.reducer';
import { Link } from 'react-router-dom';

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
        const filteredTickers = this.props.coinList.tickers.filter(ticker => ticker.name.toLowerCase().indexOf(filter) > -1 || ticker.symbol.toLowerCase().indexOf(filter) > -1);
        this.setState({ filteredTickers });
    };

    render() {
        return (
            <div>
                <TextField
                    id="tickerFilter"
                    label="Search Tickers"
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Grid container spacing={24}>
                    {this.state.filteredTickers.map(ticker => (
                        <Grid key={ticker.id} item xs={6} sm={2}>
                            <Paper>
                                <h3>
                                    <Link to={`coins/${ticker.symbol}`}>{ticker.name} - {ticker.symbol}</Link>
                                </h3>

                                <div>${parseFloat(ticker.price_usd).toFixed(6).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>

                                <IconButton aria-label="Add">
                                    <AddIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
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