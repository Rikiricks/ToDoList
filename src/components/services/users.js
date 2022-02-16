export async function getUsers(){
    try{
      const result = await fetch('http://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      return data;
    }
    catch(error){
      console.log("ERROR===", error)
        return null;
    }
  }
