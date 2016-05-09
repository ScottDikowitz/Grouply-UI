import axios from 'axios';

export function fetchUsers(callback){

    axios.get('http://localhost:8000/api/test',
    {
        withCredentials:true
    })
      .then(function (response) {
        callback(response.data.user.user2);
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });



}
