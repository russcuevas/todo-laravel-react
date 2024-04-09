<?php

use App\Http\Controllers\api\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/get-todos', [TodoController::class, 'TodoList']);
Route::post('/add-todos', [TodoController::class, 'AddToDoList']);
Route::put('/update-todo/{id}', [TodoController::class, 'UpdateToDoList']);
Route::delete('/delete-todo/{id}', [TodoController::class, 'DeleteToDoList']);
