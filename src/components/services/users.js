export async function getUsers(){
    try{
     // throw new Error("OOPS");
      const result = await fetch('http://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      return data;
    }
    catch(error){
      debugger;
      console.log("ERROR===",error);
        return {isSuccess: false, error: error.message};
    }
  }
