export async function getUsers(){
    try{
       const result = await fetch('https://jsonplaceholder.typicode.com/users');
       const data = await result.json();
       return data;
    }
    catch(error){
        return [
            {
              id: 1,
              name: 'Riki Graham',
              email: 'Sincere@april.biz',
            },
            {
              id: 2,
              name: 'Riki Howell',
              email: 'Shanna@melissa.tv',
            },
          ];
    }
  }
