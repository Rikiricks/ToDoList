import React, { useEffect, useState } from 'react'
import { getUsers } from './services/users';

const Users = () => {
  let [users, setUsers] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

     getUsers().then(data=>{
       debugger;
     
       if(data.hasOwnProperty('error')){
         console.log("DOM ERRO===",data.error)
        setError(data.error);
        setLoading(false);
       }
       else{      
      setUsers(data);
      setLoading(false);
      }  
      
       //}
      //  else{
      //    setError("Something went wrong!");
      //  }
     });
    // fetch('https://jsonplaceholder.typicode.com/users').then(res =>res.json()).then(data=>
        //  setUsers(userList)
    // ).then(() => setLoading(false))
  }, []);

  if (error) {
    return <><span>{error}</span></>;
  }
  else{

  return loading ? (
    <p aria-label="loading">Loading ...</p>
  ) : (
    <ul style={{ listStyle: 'none' }}>
      {users && users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  )
      }
}

export default Users;