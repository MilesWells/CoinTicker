import { getCoinList } from './coinList.service';

const initState = {
    tickers: []
};

export const FETCH_COIN_LIST = 'FETCH_COIN_LIST';

export const fetchCoinListActionCreator = (data) => ({ type: FETCH_COIN_LIST, payload: data });

export const fetchCoinListAsyncDispatcher = () => {
    return async (dispatch) => {
        let data = await getCoinList();
        dispatch(fetchCoinListActionCreator(data));
    }
};

export default (state = initState, action) => {
    switch(action.type) {
        case FETCH_COIN_LIST:
            return { ...state, tickers: action.payload };
        default:
            return state;
    }
};