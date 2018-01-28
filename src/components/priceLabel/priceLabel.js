import React from 'react';
import PropTypes from 'prop-types';

export default class PriceLabel extends React.Component {
    render() {
        const { decimals, price, symbol } = this.props;

        let priceString = parseFloat(price).toFixed(decimals);

        // regex only works if number has a decimal in it.
        if(decimals === 0) {
            priceString = priceString.concat('.');
        }

        priceString = priceString.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

        // remove decimal if added
        if(decimals === 0) {
            priceString = priceString.slice(0, -1);
        }

        return (
            <span>
                {symbol}{priceString}
            </span>
        );
    }
}

PriceLabel.propTypes = {
    decimals: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    symbol: PropTypes.string
};