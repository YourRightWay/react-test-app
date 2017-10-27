import * as constants from '../constants/actionTypes';

export function getDataOnline() {
  return dispatch => {
    return fetch('data.json')
      .then(response => {
        if (response.status === 200) { return response.json() }
        return Promise.reject(response);
      })
      .then(data => {
        dispatch({
          type: constants.DATA_SET,
          payload: data
        })
      })
      .catch(error => console.err('Oops! Something wrong', error));
  }
};

export function getDataLocal(data) {
  return dispatch => {
    dispatch({
      type: constants.DATA_SET,
      payload: data
    })
  }
};

export function editData(data) {
  return dispatch => {
    dispatch({
      type: constants.DATA_EDIT,
      payload: data
    })
  }
};

export function deleteData(id) {
  return dispatch => {
    dispatch({
      type: constants.DATA_DELETE,
      payload: id
    })
  }
};