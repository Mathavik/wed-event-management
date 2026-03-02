<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AdminUserController; // ← Add this line
use App\Http\Controllers\AdminEventController; // ← Add this line


// use App\Http\Controllers\EventserviceController; 
Route::get('/', function () {
    return response()->json([
        "message" => "Kalyana Vaibhogam API Working"
    ]);
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Services Routes
Route::prefix('services')->group(function () {
    require __DIR__.'/services.php';
});

// Event Routes
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

    Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminUserController::class, 'index']);       
    Route::get('/users/{id}', [AdminUserController::class, 'show']);   
    // Admin Events
Route::get('/events', [AdminEventController::class,'index']);
    Route::get('/events/{id}', [AdminEventController::class,'show']);
    Route::post('/events', [AdminEventController::class,'store']);
    Route::put('/events/{id}', [AdminEventController::class,'update']);
    Route::delete('/events/{id}', [AdminEventController::class,'destroy']);

    
});
