import { createBrowserRouter } from 'react-router-dom';
import Home from './views/home.jsx';
import Todo from './views/Todo/Todo.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/todo',
        element: <Todo />,
    }
]);

export default router;