import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Link to="/coins">Coin Ticker</Link>
            </div>
        );
    }
}