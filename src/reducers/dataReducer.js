import * as constants from '../constants/actionTypes';

const initialState = {
  items: [],
};


/**
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.DATA_EDIT: {
      const items = [...state.items];

      items.splice(action.payload.ind, 1, action.payload.data);
      return {
        ...state,
        items,
      };
    }

    case constants.DATA_DELETE: {
      const items = [...state.items];

      items.splice(action.payload, 1);
      return {
        ...state,
        items,
      };
    }

    case constants.DATA_SET:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
