import axios from 'axios';
import store from './../store';
import {addUser} from './userActions';

export function fetchUsers(){
    axios.get(process.env.API_SERVER + '/api/user',
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
