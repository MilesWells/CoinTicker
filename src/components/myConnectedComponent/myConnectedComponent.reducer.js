import { getMyData } from './myConnectedComponent.service';

const initState = {

};

export const FETCH_DATA = 'FETCH_DATA';

export const fetchDataActionCreator = (data) => ({ type: FETCH_DATA, payload: data });

export const fetchDataAsyncDispatcher = () => {
    return async (dispatch) => {
        let data = await getMyData();
        dispatch(fetchDataActionCreator(data));
    }
};

export default (state = initState, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};