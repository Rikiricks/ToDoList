import React from 'react'
import { render } from '@testing-library/react';
// import { FetchMock } from '@react-mock/fetch'
import UserList from './UserList';
import {getUsers} from './services/users'

const users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
    },
  ]

// const renderUserList = () =>{
//     return render(
//         <FetchMock
//         matcher="https://jsonplaceholder.typicode.com/users"
//         response={users}
//         >
//         <UserList/>
//         </FetchMock>
//     )
// }
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(users)
}));



describe("testing api response", ()=>{
    let userList;
   
    beforeEach(async ()=>{
        userList = await getUsers();
    })
    test('should render the users list', async () => {
        console.log("UserList====", userList);
        expect(userList.length).toEqual(users.length);
      });
});