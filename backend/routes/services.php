<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;

Route::get('/', [ServiceController::class, 'index']);
Route::get('/{id}', [ServiceController::class, 'show']);
Route::post('/', [ServiceController::class, 'store']);
Route::put('/{id}', [ServiceController::class, 'update']);
Route::delete('/{id}', [ServiceController::class, 'destroy']);