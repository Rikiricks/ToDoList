import React from 'react';

export const DropDown = () =>{
    const ddwn = {
        width:"500px"
    }
    const list  = [
        { id:1,value:"Money Heist" },
        { id:2,value:"Breaking Bad" },
        { id:3,value:"GOT" },
        { id:4,value:"Friends" },
        { id:5,value:"Prison Break" },
    ]

    const myFunction =() => {
        document.getElementById("myDropdown").classList.toggle("show");
      }

 return(
    <div class="dropdown">
  <button onClick={myFunction} class="dropbtn">Dropdown</button>
  <select id="myDropdown" class="dropdown-content">
    <input type="text" placeholder="Search.." id="myInput" />
    <option value="#about">About</option>
    <option value="#base">Base</option>
    <option value="#blog">Blog</option>
    <option value="#contact">Contact</option>
    <option value="#custom">Custom</option>
    <option value="#support">Support</option>
    <option value="#tools">Tools</option>
  </select>
</div>
 )
}