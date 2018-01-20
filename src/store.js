import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import coinListReducer from './components/coinList/coinList.reducer';

const reducers = combineReducers({
    coinList: coinListReducer
});

const middleware = [
    thunk
];

export default createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);