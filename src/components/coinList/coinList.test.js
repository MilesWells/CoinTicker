import React from 'react';
import ReactDOM from 'react-dom';
import CoinList from 'coinList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinList />, div);
});
