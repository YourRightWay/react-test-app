import * as constants from '../constants/actionTypes';
import { fileReader } from '../utils/fileHelpers';


/**
 * Loading data from static file
 * @returns {function(*): Promise.<TResult>}
 */
export function getDataOnline() {
  return dispatch => (
    fetch('data.json')
      .then((response) => {
        if (response.status === 200) { return response.json(); }
        return Promise.reject(response);
      })
      .then(data => (
        dispatch({
          type: constants.DATA_SET,
          payload: data,
        })
      ))
      .catch(error => console.error('Oops! Something wrong', error))
  );
}

/**
 * Loading data from local file
 * @param target
 * @returns {function(*): Promise.<TResult>}
 */
export function getDataLocal(target) {
  return dispatch => (
    fileReader(target)
      .then(json => (
        dispatch({
          type: constants.DATA_SET,
          payload: json,
        })
      ))
      .catch(error => console.error('Oops! Something wrong', error))
  );
}


/**
 * @param data
 * @returns {{type, payload: *}}
 */
export const editData = data => ({
  type: constants.DATA_EDIT,
  payload: data,
});


/**
 * @param id
 * @returns {{type, payload: *}}
 */
export const deleteData = id => ({
  type: constants.DATA_DELETE,
  payload: id,
});
