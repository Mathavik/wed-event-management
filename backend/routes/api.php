<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Intha route working-nu check panna
Route::get('/', function () {
    return response()->json([
        "message" => "Kalyana Vaibhogam API Working"
    ]);
});

// REGISTER - Ippo sariya irukku
Route::post('/register', [AuthController::class, 'register']);

// LOGIN - Ippo sariya irukku
Route::post('/login', [AuthController::class, 'login']);


Route::prefix('services')->group(function () {
    require __DIR__.'/services.php';
});