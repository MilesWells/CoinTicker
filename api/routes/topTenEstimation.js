const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const evaluate = async (numCoins, coinId) => {
    let topCoins = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${numCoins}`);
    topCoins = await topCoins.json();

    let coin = await fetch(`https://api.coinmarketcap.com/v1/ticker/${coinId}/`);
    coin = (await coin.json())[0];

    if (coin.error) {
        throw { notFound: true, message: `Ticker with id ${coinId} not found.` };
    }

    return topCoins.map(topCoin => {
        const evaluation = (topCoin.available_supply / coin.available_supply * topCoin.price_usd).toFixed(6);
        return {
            coin: topCoin.name,
            symbol: topCoin.symbol,
            evaluation,
            market_cap_evaluation: (evaluation * coin.available_supply).toFixed(2)
        };
    })
};

router.get('/topten/:id', async (req, res) => {
    try {
        const evaluation = await evaluate(10, req.params.id);
        res.json(evaluation);
    } catch (e) {
        if(e.notFound) {
            return res.status(404).send(e.message);
        }

        console.error(e);
        return res.status(500).send('There was an error processing your request:', e);
    }
});

router.get('/topcustom', async (req, res) => {
    try {
        const numCoins = req.query.numCoins;
        const coinId = req.query.coinName;

        if(!numCoins || !coinId) {
            return res.status(400).send(`Both query string parameters 'numCoins' and 'coinName' are required`)
        }

        const evaluation = await evaluate(numCoins, coinId);
        res.json(evaluation);
    } catch (e) {
        console.error(e);
        return res.status(500).send('There was an error processing your request:', e);
    }
});

module.exports = router;