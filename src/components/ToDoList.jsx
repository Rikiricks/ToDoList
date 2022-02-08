import { react, useEffect, useState } from "react";
import ListItem from "./ListItem";

function ToDoList() {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(()=>{
       
        const data = JSON.parse(localStorage.getItem("data"));
        setList(data || []);
    },[]);

    const handleCheck = (e)=>{        
        e.stopPropagation();
       
        const id = e.target.value;
        const curr = list.find(a=>a.id == id);
        curr.isDone = !curr.isDone;
        setList(list);
        localStorage.setItem("data", JSON.stringify(list));
  
    }

    const handleRemove = (e,val) => {
        const newList  = list.filter(a=>a.id != val);
        setList(newList);
        localStorage.setItem("data", JSON.stringify(newList));
    }
    

    const handleClick = (e) => {
        debugger;
        e.preventDefault();
        const index = list.length > 0 ? getId() : 0;
        const data = {
            id: index+1,
            title: title,
            isDone: false
        }
        list.push(data);

        localStorage.setItem("data", JSON.stringify(list));
        setList(list);
        setTitle("");       
    }

    const getId = (e) =>{
        const ids = list.map(a => a.id);
        return Math.max(...ids);
    }

    

    return (
        <div>
            <h1>ToDo List</h1>

            <div className="list-group">
                <ListItem list={list} handleRemove={handleRemove} handleCheck={handleCheck} ></ListItem>
                
            </div>
            <div className="mt-2">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><button className="btn btn-primary" onClick={handleClick}> Add </button>
            </div>

        </div>
    )
}

export default ToDoList;