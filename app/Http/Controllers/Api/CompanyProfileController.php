<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\JsonResponse;

class CompanyProfileController extends Controller
{
    /**
     * GET /api/company-profile
     * Public endpoint used by the storefront (header, footer, contact info)
     * — always returns whichever profile is currently active.
     */
    public function active(): JsonResponse
    {
        return response()->json(CompanyProfile::active() ?? []);
    }
}
