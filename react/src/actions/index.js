import axios from 'axios';
import { FETCH_LIST } from './type';

export function getList(){

  const request = axios.get(`http://127.0.0.1:3000/getlist`);
  return (dispatch) => {
    request.then(({data}) => {
      dispatch({type: FETCH_LIST, payload: data})
    })
  }
}