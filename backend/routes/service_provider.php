<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceProviderController;

// Get providers for a service
Route::get('/services/{service_id}/providers', [ServiceProviderController::class, 'index']);

// Register provider
Route::post('/providers', [ServiceProviderController::class, 'store']);

// Get single provider
Route::get('/providers/{id}', [ServiceProviderController::class, 'show']);

// Delete provider
Route::delete('/providers/{id}', [ServiceProviderController::class, 'destroy']);