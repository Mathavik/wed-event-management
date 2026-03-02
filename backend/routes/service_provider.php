<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceProvidersController;

// Get providers for a service
Route::get('/services/{service_id}/providers', [ServiceProvidersController::class, 'index']);

// Register provider
Route::post('/', [ServiceProvidersController::class, 'store']);

// Get single provider
Route::get('/providers/{id}', [ServiceProvidersController::class, 'show']);

// Delete provider
Route::delete('/providers/{id}', [ServiceProvidersController::class, 'destroy']);