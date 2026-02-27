<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController; // 1. Intha line-ah add pannunga
use App\Http\Controllers\EventserviceController; 
Route::get('/', function () {
    return response()->json([
        "message" => "Kalyana Vaibhogam API Working"
    ]);
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// LOGIN - Ippo sariya irukku
Route::post('/login', [AuthController::class, 'login']);


Route::prefix('services')->group(function () {
    require __DIR__.'/services.php';
});
// Event Routes - 2. Intha mathiri mathunga ($router use pannathinga)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);
/*
|--------------------------------------------------------------------------
| EVENT SERVICES APIs
|--------------------------------------------------------------------------
*/

// Get all services
Route::get('/services', [EventServiceController::class, 'index']);

// Get single service
Route::get('/services/{id}', [EventServiceController::class, 'show']);

// Create service
Route::post('/services', [EventServiceController::class, 'store']);

// Update service
Route::put('/services/{id}', [EventServiceController::class, 'update']);

// Delete service
Route::delete('/services/{id}', [EventServiceController::class, 'destroy']);