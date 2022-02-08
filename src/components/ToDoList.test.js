import React from 'react'
import {render, screen} from '@testing-library/react'
import ToDoList from './ToDoList';
import '@testing-library/jest-dom'


test('test content of the To Do list', async() =>{
render(<ToDoList/>);
const titleValue = screen.getByText('ToDo List');
console.log(titleValue);
expect(titleValue).toHaveTextContent("ToDo List");

expect(screen.getByRole('button')).toBeEnabled();

expect(screen.getByRole('ListItem')).toBeInTheDocument();
});