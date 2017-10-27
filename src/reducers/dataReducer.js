import * as constants from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, {type, payload}) {

  switch (type) {
    case constants.DATA_EDIT:
      let newData = [...state];
      newData.splice(payload.ind, 1, payload.data);
      return newData;

    case constants.DATA_DELETE:
      let deleteData = [...state];
      deleteData.splice(payload, 1);
      return deleteData;

    case constants.DATA_SET:
      return payload;

    default:
      return state;
  }
}