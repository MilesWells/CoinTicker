import React from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Paper, TextField } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

class CoinDetails extends React.Component {
    constructor(props) {
        super();
        this.state = {
            coinDetails: props.coinList.tickers.find(coin => coin.symbol === props.match.params.coinId)
        };
    }

    render() {

        return (
            <div>{this.state.coinDetails.symbol}</div>
        )
    }
}

export default connect(
    (state) => ({
        coinList: state.coinList
    }),
    {}
)(CoinDetails)