<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\MessageController;
use App\Http\Controllers\Api\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
| Add these to your routes/api.php (created by `php artisan install:api`).
*/

// ---- Public ----
Route::post('contact', [ContactController::class, 'store']);
Route::get('settings', [SettingController::class, 'index']);   // site settings for the frontend

// ---- Admin ----
Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);

        // Contact messages (dashboard)
        Route::get('messages', [MessageController::class, 'index']);
        Route::delete('messages/{message}', [MessageController::class, 'destroy']);

        // Site settings
        Route::get('settings', [AdminSettingController::class, 'index']);
        Route::post('settings', [AdminSettingController::class, 'update']); // multipart (logo upload)
    });
});
