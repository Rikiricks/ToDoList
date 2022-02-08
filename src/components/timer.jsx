import {useEffect, useRef, useState} from 'react';


function Timer(){

const [timer, setTimer] = useState(0);
const [isActive, setIsActive] = useState(false);
const [isPause, setIsPause] = useState(false);
const currRef = useRef(null);


useEffect(()=>{
    debugger;  
   
    if(isPause || !isActive){
        clearInterval(currRef.current);
    }
    if(isActive){        
       
        currRef.current = setInterval(()=>{         
           
            setTimer(timer => timer + 1);
        },10)
    }   
    
    
},[isActive,isPause]);

const resetTimer = () =>{
    setIsPause(false);
    setIsActive(false);
    setTimer(0);
}

const stopTimer = () =>{
    setIsPause(true);
    setIsActive(false);
}

const startTimer = () =>{
    setIsActive(true);
    setIsPause(false);
}

const formatTimer = () =>{
    const seconds = `0${timer % 60}`.slice(-2);
    const getMinutes = Math.floor(timer / 60);
    console.log(getMinutes);
    const minutes = `0${getMinutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${minutes} : ${seconds}`;
}

return(
    <>
    <h2>Timer</h2>
    <div className="container">
        <div className='form-group'>

            {/* <label>&nbsp; {Math.floor(timer / 60)}&nbsp;:</label>        */}
            {/* <label>&nbsp; {Math.floor(timer / 60)}&nbsp;:</label>        */}
            {/* <label>&nbsp;{timer} </label>            */}
            <label>{formatTimer()}</label>

        </div>
        <div className='form-group'>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Pause</button> 
            <button onClick={resetTimer}>Reset</button>
        </div>

    </div>
    </>
);
}




export default Timer;