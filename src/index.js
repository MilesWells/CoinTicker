import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-materialize/'
import App from './components/app/app';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
