import React from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Paper, TextField } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

class CoinList extends React.Component {
    constructor() {
        super();
        this.state = {
            tickers: [],
            filteredTickers: [],
            tickerFilter: ''
        };
    }

    async componentDidMount() {
        await this.getTickerData();
    }

    getTickerData = async () => {
        const result = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=250');
        const json = await result.json();
        this.setState({ tickers: json, filteredTickers: json });
    };

    handleChange = event => {
        let filter = event.target.value.toLowerCase();
        const filteredTickers = this.state.tickers.filter(ticker => ticker.name.toLowerCase().indexOf(filter) > -1 || ticker.symbol.toLowerCase().indexOf(filter) > -1);
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
                                    <a href={`https://coinmarketcap.com/currencies/${ticker.id}`} target="_blank">{ticker.name} - {ticker.symbol}</a>
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

    }),
    {

    }
)(CoinList);