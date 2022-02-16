import React, { useEffect, useState } from 'react'
import { getUsers } from './services/users';

const Users = () => {
  let [users, setUsers] = useState([])
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false);

     getUsers().then(data=>{
       debugger;
      setUsers(data);
      setLoading(false);
     });
    // fetch('https://jsonplaceholder.typicode.com/users').then(res =>res.json()).then(data=>
        //  setUsers(userList)
    // ).then(() => setLoading(false))
  }, []);

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

export default Users