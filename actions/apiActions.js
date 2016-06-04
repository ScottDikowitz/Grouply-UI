import axios from 'axios';
import store from './../store';
import {addUser} from './userActions';

export function fetchUsers(){
    axios.get('http://grouplyapi.herokuapp.com/api/test',
    {
        withCredentials:true
    })
      .then(function (response) {
        store.dispatch(addUser(response.data.user.user2));
        console.log(response);
        return response;
      })
      .catch(function (response) {
        console.log(response);
      });



}
