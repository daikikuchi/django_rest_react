import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

// A reducer is basicallu function that takes in an action and evaluate it
// and send down certain state depending on what that action does

const initialState = {
    leads: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload
      };
    case DELETE_LEAD:
     return {
       ...state,
       leads: state.leads.filter(lead => lead.id !==
       action.payload)
     }
    case ADD_LEAD:
      console.log(state)
      return{
        ...state,
        leads: [...state.leads, action.payload]
      }
    default:
      return state;
  }
}
