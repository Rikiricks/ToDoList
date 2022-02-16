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

function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      })
    })
  }
}
// global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(users)
// }));

  // beforeEach(async ()=>{
  //     fetch.mockClear();
  //      // userList = await getUsers();
  //   })



describe("testing api response", ()=>{
  
    test('should render the users list', async () => {
      jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(users))
         const userList = await getUsers();       
        // console.log("UserList====", userList);
        expect(userList.data.length).toEqual(users.length);
        expect(fetch).toHaveBeenCalledTimes(1);
        global.fetch.mockClear();
      });

      test('returns null when error occured', async ()=>{
        fetch.mockImplementationOnce(()=> Promise.reject("API is down"));
        const userList = await getUsers();
        // console.log("UserList====", userList);
        expect(userList).toEqual(null);
      expect(fetch).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/users')

      });
});

describe("testing api response in dom", ()=>{
  test("should renders user's list", async() =>{
    fetch.mockResponseOnce(users);
    const {findByText,getByText, findByRole} = render(<UserList/>);
    //const list = await findByRole("list");
    //console.log("UserList===", list.children);
    expect(getByText(/Leanne Graham/i)).toBeInTheDocument();
    // expect(getByText(users[1].name)).toBeInTheDocument();
  });
});