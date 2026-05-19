import * as actionTypes from '../actions/actionTypes';

const initialState = {
    portfolioItems: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PORTFOLIOITEMS:
            return {
                ...state,
                portfolioItems: action.portfolioItems
            };
        default:
            return state;
    }

};

export default reducer;