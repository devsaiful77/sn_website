<?php

use App\Http\Controllers\Api\Admin\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin API routes
|--------------------------------------------------------------------------
| Add this block to your routes/api.php (created by `php artisan install:api`).
| Token-based auth via Sanctum — the frontend sends `Authorization: Bearer <token>`.
*/

Route::prefix('admin')->group(function () {
    // Public
    Route::post('login', [AuthController::class, 'login']);

    // Protected — requires a valid Sanctum token
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);

        // Future admin resources go here, e.g.:
        // Route::apiResource('services', ServiceController::class);
    });
});
