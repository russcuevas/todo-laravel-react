import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'react-toastify/dist/ReactToastify.css';
import './Todo.css';

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [insertTodo, setInsertTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    // getting todo list
    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-todos');
            setTodos(response.data.map(todo => ({ ...todo, editable: false })));
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // inserting todo list
    const handleInputChange = (event) => {
        setInsertTodo(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/add-todos', { todo: insertTodo });
            fetchTodos();
            setInsertTodo('');
            toast.success('Todo added successfully');
        } catch (error) {
            console.error('Error inserting data', error);
            toast.error('Error adding todo');
        }
    };

    // updating todo
    const handleUpdateClick = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, editable: true };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleSaveClick = async (id, updatedTodo) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/update-todo/${id}`, { todo: updatedTodo });
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, editable: false, todo: updatedTodo };
                }
                return todo;
            });
            setTodos(updatedTodos);
            toast.success(`Todo ${id} updated successfully`);
        } catch (error) {
            console.error('Error updating todo', error);
        }
    };

    const handleCancelClick = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, editable: false };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // deleting todo list
    const handleDeleteClick = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3a0ca3',
            cancelButtonColor: '#b7121a',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/delete-todo/${id}`);
                    setTodos(todos.filter(todo => todo.id !== id));
                    toast.success(`Todo ${id} deleted successfully`);
                } catch (error) {
                    console.error('Error deleting todo', error);
                }
            }
        });
    };

    return (
        <div>
            <ToastContainer />
            <h1>Todo list</h1>
            <form onSubmit={handleSubmit}>
                <input className='input-add' type="text" placeholder="Add to do" value={insertTodo} onChange={handleInputChange} />
                <button className='add-button' type="submit">Add</button>
            </form>
            <br />
            <table className="todo-table">
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>
                                {todo.editable ? (
                                    <input className='input-update'
                                        type="text"
                                        value={todo.todo}
                                        onChange={e => {
                                            const updatedTodos = todos.map(t => {
                                                if (t.id === todo.id) {
                                                    return { ...t, todo: e.target.value };
                                                }
                                                return t;
                                            });
                                            setTodos(updatedTodos);
                                        }}
                                    />
                                ) : (
                                    todo.todo
                                )}
                            </td>
                            <td>{todo.created_at}</td>
                            <td>{todo.updated_at}</td>
                            <td>
                                {todo.editable ? (
                                    <>
                                        <button className='button-save' onClick={() => handleSaveClick(todo.id, todo.todo)}>Save</button>
                                        <button className='button-cancel' onClick={() => handleCancelClick(todo.id)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className='button-update' onClick={() => handleUpdateClick(todo.id)}>Update</button>
                                        <button className="delete-btn" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
