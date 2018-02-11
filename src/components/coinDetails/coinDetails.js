import React from 'react';
import { connect } from 'react-redux';
import PriceLabel from '../priceLabel/priceLabel';
import {
    Grid, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableHead,
    TableRow
} from 'material-ui';
import { Link } from 'react-router-dom';

class CoinDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            coinDetails: {},
            marketCapEquivalence: [],
            hack: false
        };
    }

    async componentWillMount() {
        let coinDetails = this.props.coinList.tickers.find(coin => coin.symbol === this.props.match.params.coinId);
        await this.getMarketCapEquivalence(coinDetails);
    }

    async componentWillReceiveProps(nextProps) {
        let coinDetails = nextProps.coinList.tickers.find(coin => coin.symbol === nextProps.match.params.coinId);
        await this.getMarketCapEquivalence(coinDetails);
    }

    async getMarketCapEquivalence(coinDetails) {
        if(coinDetails) {
            let result = await fetch(`/api/marketcap/equivalence/topten/${coinDetails.id}`);
            let marketCapEquivalence = await result.json();

            this.setState({coinDetails, marketCapEquivalence});
        }
    }

    render() {
        const { coinDetails, marketCapEquivalence } = this.state;
        return (
            <Grid container>
                <Grid item md={6} xs={12}>
                    <Paper>
                        {coinDetails.name && (
                            <div>
                                <h3><a href={`https://coinmarketcap.com/currencies/${coinDetails.id}/`} target="_blank">{coinDetails.name} ({coinDetails.symbol})</a></h3>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Rank" secondary={coinDetails.rank}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Price (USD)" secondary={'$' + coinDetails.price_usd}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Price (BTC)" secondary={coinDetails.price_btc}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Market Cap" secondary={(<PriceLabel decimals={0} price={coinDetails.market_cap_usd} symbol="$"/>)}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Available Supply" secondary={(<PriceLabel decimals={0} price={coinDetails.available_supply}/>)}/>
                                    </ListItem>
                                    {coinDetails.total_supply && (
                                        <ListItem>
                                            <ListItemText primary="Total Supply" secondary={(<PriceLabel decimals={0} price={coinDetails.total_supply}/>)}/>
                                        </ListItem>
                                    )}
                                    {coinDetails.max_supply && (
                                        <ListItem>
                                            <ListItemText primary="Max Supply" secondary={(<PriceLabel decimals={0} price={coinDetails.max_supply}/>)}/>
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemText primary="Change (24h)" secondary={`${coinDetails.percent_change_24h}%`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Change (7d)" secondary={`${coinDetails.percent_change_7d}%`}/>
                                    </ListItem>
                                </List>
                            </div>
                        )}
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper>
                        <h3>Market Cap Equivalence</h3>
                        {marketCapEquivalence.length > 0 && (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Coin/Token</TableCell>
                                        <TableCell>Market Cap</TableCell>
                                        <TableCell>Equivalent {coinDetails.name} Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {marketCapEquivalence.map(mce => (
                                        <TableRow key={mce.symbol}>
                                            <TableCell><Link to={`/coins/${mce.symbol}`}>{mce.coin}</Link></TableCell>
                                            <TableCell><PriceLabel decimals={0} price={mce.marketCap} symbol="$"/></TableCell>
                                            <TableCell><PriceLabel decimals={2} price={mce.evaluation} symbol="$"/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default connect(
    (state) => ({
        coinList: state.coinList
    }),
    {}
)(CoinDetails)