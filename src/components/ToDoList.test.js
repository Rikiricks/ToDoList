import React from 'react'
import {render, screen, fireEvent, wait} from '@testing-library/react';
import ToDoList from './ToDoList';
import '@testing-library/jest-dom';
import TestRenderer from 'react-test-renderer';
import ListItem from './ListItem';
import Timer from './timer';


test('test content of the To Do list', async () => {

    render(<ToDoList />);

    const titleValue = screen.getByText('ToDo List');

    expect(titleValue).toHaveTextContent("ToDo List");

    expect(screen.getByRole('button')).toBeEnabled();

});


test('should render child component', async () => {

    const testRenderer = TestRenderer.create(<ToDoList />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ListItem)).not.toBeNull();

    expect(testInstance.findByType(ListItem).props.list).toEqual([]);

});


test('props should render', async () => {
    const data = [{ id: 1, title: "Brunch", isDone: false }, { id: 2, title: "Dinner", isDone: true }];
    const handleRemove = jest.fn();
    const handleCheck = jest.fn();

    const { container } = render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />)


    expect(screen.getByText('Brunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(container.querySelectorAll(".list-group-item").length).toBe(2);

});


describe('Id use in To Do List Items', ()=>{
    test("finds title", async ()=>{
        const data = [{ id: 1, title: "Workout", isDone: false }];
        const handleRemove = jest.fn();
        const handleCheck = jest.fn();

        render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />);

        expect(screen.getAllByTestId(/item-/i).length).toBe(1);
        expect(screen.getByTestId(/item-/).textContent).toBe("Workout");

    })
});

describe('List rendering check', ()=>{
    const data = [{ id: 1, title: "A", isDone: true },{ id: 2, title: "B", isDone: false },{ id: 3, title: "C", isDone: true }];
    test("should render specific title", async ()=>{
        
        const handleRemove = jest.fn();
        const handleCheck = jest.fn();

        render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />);
        
        const items = screen.getAllByTestId(/item-/i);
        const titles = items.map(a=>a.textContent);       
        expect(titles).toEqual(["A","B","C"]);

    });

    test("should render two completed task", async ()=>{
        
        const handleRemove = jest.fn();
        const handleCheck = jest.fn();

        render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />);
        
        const items = screen.getAllByRole("checkbox");
        const completed = items.filter(a=>a.checked).map(a=>a.checked);
       
        expect(completed.length).toBe(2);

    });
});

describe('fire action event', () => {
    const data = [{ id: 1, title: "Brunch", isDone: false }, { id: 2, title: "Dinner", isDone: false }];
    test('should brunch done', async () => {
        const handleRemove = jest.fn();
        const handleCheck = jest.fn();

        render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />);
      
        fireEvent.click(screen.getByTestId("item-1"));
        const brunch = screen.getByTestId("item-1");
        const dinner = screen.getByTestId("item-2");

        expect(handleCheck).toHaveBeenCalledTimes(1);
        expect(brunch.firstElementChild.checked).toBe(true);
        expect(dinner.firstElementChild.checked).toBe(false);

    });

    test('should call remove funtion on delete button click', async()=>{
        const handleRemove = jest.fn();
        const handleCheck = jest.fn();

        render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />);
        
        fireEvent.click(screen.getByTestId("item-2").querySelector(".btn-danger"));
        
        expect(handleRemove).toHaveBeenCalledTimes(1);      
    });
});

