import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <div className="todo-home">
            <h1>Welcome to Your Todo List App</h1>
            <p>Start organizing your tasks and stay productive!</p>
            <a href="/todo" className="btn-todo">Go to Todo List</a>
        </div>
    );
}
