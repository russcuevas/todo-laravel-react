<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function TodoList()
    {
        return Todo::all();
    }

    public function AddToDoList(Request $request)
    {
        $request->validate([
            'todo' => 'required|string|max:255',
        ]);

        $todo = new Todo();
        $todo->todo = $request->input('todo');
        $todo->save();

        return response()->json($todo, 200);
    }

    public function UpdateToDoList(Request $request, $id)
    {
        $request->validate([
            'todo' => 'required|string|max:255',
        ]);

        $todo = Todo::findOrFail($id);
        $todo->todo = $request->input('todo');
        $todo->save();

        return response()->json($todo, 200);
    }

    public function DeleteToDoList($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json($todo, 200);
    }
}
