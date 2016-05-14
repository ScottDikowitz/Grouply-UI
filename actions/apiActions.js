import axios from 'axios';
import store from './../store';
import {addUser} from './userActions';

export function fetchUsers(callback){

    axios.get('http://localhost:8000/api/test',
    {
        withCredentials:true
    })
      .then(function (response) {
        // callback(response.data.user.user2);

        store.dispatch(addUser(response.data.user.user2));
        console.log(response);
        return response;
      })
      .catch(function (response) {
        console.log(response);
      });



}
