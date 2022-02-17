import React from 'react'
import {render, screen, fireEvent, wait, waitForElementToBeRemoved} from '@testing-library/react';

// import { FetchMock } from '@react-mock/fetch'
import UserList from './UserList';
import {getUsers} from './services/users'

const users = [
    {
      id: 1,
      name: 'Riki Graham',
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
        //expect(userList).toEqual(null);
      expect(fetch).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/users');
      global.fetch.mockClear();

      });
});

describe("testing api response in dom", ()=>{
  test("should renders user's list", async() =>{
    // fetch.mockResponseOnce(users);
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(users)
    })
  );
    const {findByText,getAllByRole,findAllByRole, findByRole} = render(<UserList/>);
    // const list = screen.getAllByRole("listitem");
    // console.log("UserList===", list);

    const element = await findByText(/Riki Graham/i);
    // console.log("UserList===", element);
    expect(element).toBeInTheDocument();
    // expect(getByText(users[1].name)).toBeInTheDocument();
    global.fetch.mockClear();
  });

  test('error message is shown', async () => {
    // fetch.mockImplementationOnce(() => {
    //   return Promise.reject({ message: 'API is down' });
    // });
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: 'API is down' });
    });
    
    screen.debug();
    render(<UserList />);
  
    const errorMessage = await screen.findByText('API is down');
     console.log("ERROR-MSJ===", errorMessage.textContent);
    expect(errorMessage).toBeInTheDocument();
    global.fetch.mockClear();
  });

  test('loading text is shown while API request is in progress', async () => {
    render(<UserList/>);
    const loading = screen.getByText('Loading ...');
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText('Loading ...'));
  });

});