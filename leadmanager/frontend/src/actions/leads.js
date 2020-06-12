import axios from 'axios';

import { GET_LEADS } from './types';
// any action we want to use is here
// dispatch an action to reducer

// GET LEADS
export const getLeads = () => dispatch => {
  axios.get('/api/leads')
    .then(res => {
      // disptch GET_LEADS action to reducer
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    }).catch(err => console.log(err));
}
