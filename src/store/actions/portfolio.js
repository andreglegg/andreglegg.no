import * as actionTypes from './actionTypes';
import axios from '../../axios-portfolio';

export const setPortfolioItems = (portfolioItems) => {
    return {
        type: actionTypes.SET_PORTFOLIOITEMS,
        portfolioItems: portfolioItems
    }
};

export const fetchPortfilioItemsFailed = () => {
    return {
        //type: actionTypes.FETCH_PORTFOLIOITEMS_FAILED
    }
};

export const initPortfolioItems = () => {
    return dispatch => {
        //console.log(this.props);
        axios.get('portfolioItems.json')
            .then(response => {
                //console.log(response.data);
                dispatch(setPortfolioItems(response.data));

            })
            .catch(error => {

            })
    }
};