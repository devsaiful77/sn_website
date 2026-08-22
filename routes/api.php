<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\MessageController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
| Add these to your routes/api.php (created by `php artisan install:api`).
*/

// ---- Public ----
Route::post('contact', [ContactController::class, 'store']);

// ---- Admin ----
Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);

        // Contact messages (dashboard)
        Route::get('messages', [MessageController::class, 'index']);
        Route::delete('messages/{message}', [MessageController::class, 'destroy']);
    });
});
