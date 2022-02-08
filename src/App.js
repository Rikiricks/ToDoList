import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ToDoList from './components/ToDoList';
import { DropDown } from './components/drpdwn/DropDown';
import Timer from './components/timer';


function App() {
  return (
    <div className="App">
      <header className="App-header">
     
      <Timer></Timer>

      </header>
    </div>
  );
}

export default App;
