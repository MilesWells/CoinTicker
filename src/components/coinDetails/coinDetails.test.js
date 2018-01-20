import React from 'react';
import ReactDOM from 'react-dom';
import CoinDetails from 'coinDetails';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CoinDetails />, div);
});
