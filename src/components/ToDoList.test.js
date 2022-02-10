import React from 'react'
import { render, screen } from '@testing-library/react'
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


test('Should render child component', async () => {

    const testRenderer = TestRenderer.create(<ToDoList />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ListItem)).not.toBeNull();

    expect(testInstance.findByType(ListItem).props.list).toEqual([]);

});

test('Props should render', async () => {
    const data = [{ id: 1, title: "Brunch", isDone: false }, { id: 2, title: "Dinner", isDone: true }];
    const handleRemove = jest.fn();
    const handleCheck = jest.fn();

    const { container } = render(<ListItem list={data} handleRemove={handleRemove} handleCheck={handleCheck} />)


    expect(screen.getByText('Brunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();

    expect(container.querySelectorAll(".list-group-item").length).toBe(1);

});