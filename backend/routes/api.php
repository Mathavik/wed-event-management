<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminEventController;
use App\Http\Controllers\EnquiryController;


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
Route::prefix('providers')->group(function () {
    require __DIR__.'/service_provider.php';
});

// Enquiries Routes
Route::post('/enquiries', [EnquiryController::class, 'store']);
Route::get('/enquiries', [EnquiryController::class, 'index']);
Route::get('/enquiries/{id}', [EnquiryController::class, 'show']);
Route::get('/vendor/enquiries/{providerId}', [EnquiryController::class, 'vendorEnquiries']);
Route::get('/vendor/bookings/{provider_id}', [EnquiryController::class, 'vendorBookings']);
Route::delete('/enquiries/{id}', [EnquiryController::class, 'destroy']);
Route::get('/admin/dashboard-stats', [EnquiryController::class, 'adminDashboardStats']);
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
