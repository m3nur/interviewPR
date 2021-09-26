import { GET_ALL_COMPANYS, GET_ALL_FROM_SERVER, LOG_OUT } from '../types/types';
import initState from '../initState';

function companyReducer(state = initState.companys, action) {
  switch (action.type) {
    case GET_ALL_COMPANYS:
      return action.payload;

    case GET_ALL_FROM_SERVER:
      return action.payload;

      case LOG_OUT:
      return initState.companys
    default:
      return state;
  }
}

export default companyReducer;
