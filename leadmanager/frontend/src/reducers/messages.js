import { GET_ERRORS, CREATE_MESSAGE} from '../actions/types';

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
      case CREATE_MESSAGE:
      // set state whatever we pass in, which is message object
        return (state = action.payload)
    default:
      return state;
  }
}
