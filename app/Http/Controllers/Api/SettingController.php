<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    /**
     * GET /api/settings  (public)
     * Returns all site settings as a { key: value } map for the frontend.
     */
    public function index(): JsonResponse
    {
        return response()->json(Setting::allAsMap());
    }
}
