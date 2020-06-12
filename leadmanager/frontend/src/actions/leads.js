import axios from 'axios';

import { GET_LEADS, DELETE_LEAD } from './types';
// any action we want to use is here
// dispatch an action to reducer

// GET LEADS
export const getLeads = () => dispatch => {
  axios.get('/api/leads/')
    .then((res) => {
      // disptch GET_LEADS action to reducer
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    }).catch((err) => console.log(err));
}

// Delete Lead

export const deleteLead = (id) => disptch => {
  axios
    .get(`/api/leads/${id}`)
    .then(res => {
      disptch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.lof(err))
  }
