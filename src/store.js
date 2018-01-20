import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({

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