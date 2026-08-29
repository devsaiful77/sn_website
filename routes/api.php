<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\MessageController;
use App\Http\Controllers\Api\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CompanyProfileController;
use App\Http\Controllers\Api\Admin\CompanyProfileController as AdminCompanyProfileController;

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
| Add these to your routes/api.php (created by `php artisan install:api`).
*/

// ---- Public ----
Route::post('contact', [ContactController::class, 'store']);
Route::get('settings', [SettingController::class, 'index']);   // site settings for the frontend
Route::get('/company-profile', [CompanyProfileController::class, 'active']);

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

        Route::get('/company-profiles', [AdminCompanyProfileController::class, 'index']);
        Route::get('/company-profiles/{companyProfile}', [AdminCompanyProfileController::class, 'show']);
        Route::post('/company-profiles', [AdminCompanyProfileController::class, 'store']);
        // frontend sends this as multipart/form-data with a hidden _method=PUT field,
        // so the logo file still comes through correctly
        Route::post('/company-profiles/{companyProfile}', [AdminCompanyProfileController::class, 'update']);
        Route::post('/company-profiles/{companyProfile}/activate', [AdminCompanyProfileController::class, 'activate']);
        Route::delete('/company-profiles/{companyProfile}', [AdminCompanyProfileController::class, 'destroy']);

    });
});
