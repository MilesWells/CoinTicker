import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import myComponentReducer from './components/myConnectedComponent/myConnectedComponent.reducer';

const reducers = combineReducers({
    myComponent: myComponentReducer
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