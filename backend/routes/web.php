<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
   

$router->post('/login', 'AuthController@login');
    return view('welcome');
});
