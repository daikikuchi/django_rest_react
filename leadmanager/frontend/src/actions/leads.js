import axios from 'axios';
import { createMessage } from './messages';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types';
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
    .delete(`/api/leads/${id}`)
    .then(res => {
      disptch(createMessage({deleteLead : 'Lead Deleted'}))
      disptch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err))
  }

  // Add Lead
  export const addLead = (lead) => dispatch => {
    axios
      .post('/api/leads/', lead)
      .then(res => {
        dispatch(createMessage({ addLead : 'Lead Added'}))
        dispatch({
            type: ADD_LEAD,
            payload: res.data
        })
      })
      .catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status,
        };
        dispatch({
          type: GET_ERRORS,
          payload: errors,
        });
      });
   }
