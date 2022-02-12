//import { render, screen } from '@testing-library/react';
import App from './App';
import { render, unmountComponentAtNode} from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoList from './components/ToDoList';

let container = null;

beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(()=>{
 unmountComponentAtNode(container);
 container.remove();
 container = null;
});

it("renders with or without title", () => {
    act(() => {
      render(<ToDoList />, container);
    });
    // console.log(container.querySelector("h1").textContent);
    expect(container.querySelector("h1").textContent).toBe("ToDo List"); 
    
  });

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });
