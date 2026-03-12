<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminEventController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        "message" => "Kalyana Vaibhogam API Working"
    ]);
});


// ================= AUTH =================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// ================= SERVICES =================

Route::prefix('services')->group(function () {
    require __DIR__.'/services.php';
});

Route::prefix('providers')->group(function () {
    require __DIR__.'/service_provider.php';
});


// ================= ENQUIRIES =================

Route::post('/enquiries', [EnquiryController::class, 'store']);
Route::get('/enquiries', [EnquiryController::class, 'index']);
Route::get('/enquiries/{id}', [EnquiryController::class, 'show']);
Route::delete('/enquiries/{id}', [EnquiryController::class, 'destroy']);

Route::get('/vendor/enquiries/{providerId}', [EnquiryController::class, 'vendorEnquiries']);
Route::get('/vendor/bookings/{provider_id}', [EnquiryController::class, 'vendorBookings']);

Route::get('/admin/dashboard-stats', [EnquiryController::class, 'adminDashboardStats']);


// ================= EVENTS =================

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

Route::post('/contact',[ContactController::class,'store']);

// ================= ADMIN =================

Route::prefix('admin')->group(function () {

    // USERS
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::get('/users/{id}', [AdminUserController::class, 'show']);

    // EVENTS
    Route::get('/events', [AdminEventController::class,'index']);
    Route::get('/events/{id}', [AdminEventController::class,'show']);
    Route::post('/events', [AdminEventController::class,'store']);
    Route::put('/events/{id}', [AdminEventController::class,'update']);
    Route::delete('/events/{id}', [AdminEventController::class,'destroy']);

    // ENQUIRY ACCEPT / REJECT
    Route::get('/enquiries/accept/{id}', [EnquiryController::class, 'accept']);
    Route::get('/enquiries/reject/{id}', [EnquiryController::class, 'reject']);


    // ADMIN VIEW PAYMENTS
    Route::get('/user-payments', [PaymentController::class, 'index']);
    Route::get('/user-payments/{id}', [PaymentController::class, 'show']);
});


// ================= PAYMENTS (USER SIDE) =================

Route::post('/user-payment', [PaymentController::class, 'store']);
Route::put('/user-payments/{id}', [PaymentController::class, 'update']);
Route::delete('/user-payments/{id}', [PaymentController::class, 'destroy']);
