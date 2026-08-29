<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyProfileController extends Controller
{
    /**
     * GET /api/admin/company-profiles
     * List all company profiles (active one first).
     */
    public function index(): JsonResponse
    {
        return response()->json(
            CompanyProfile::orderByDesc('is_active')->orderByDesc('id')->get()
        );
    }

    /**
     * GET /api/admin/company-profiles/{companyProfile}
     */
    public function show(CompanyProfile $companyProfile): JsonResponse
    {
        return response()->json($companyProfile);
    }

    /**
     * POST /api/admin/company-profiles   (multipart/form-data)
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request);
        unset($data['logo'], $data['is_active']);

        $profile = CompanyProfile::create($data);

        if ($request->hasFile('logo')) {
            $profile->logo = $this->storeLogo($request);
            $profile->save();
        }

        // First profile ever created, or explicitly requested -> make it active.
        if ($request->boolean('is_active') || CompanyProfile::count() === 1) {
            $profile->activate();
        }

        return response()->json([
            'message' => 'Company profile created.',
            'profile' => $profile->fresh(),
        ], 201);
    }

    /**
     * POST /api/admin/company-profiles/{companyProfile}
     * (send as multipart/form-data with _method=PUT from the frontend
     *  so the logo file upload still works)
     */
    public function update(Request $request, CompanyProfile $companyProfile): JsonResponse
    {
        $data = $this->validated($request, $companyProfile->id);
        unset($data['logo'], $data['is_active']); // activation is handled by activate()

        $companyProfile->fill($data);

        if ($request->hasFile('logo')) {
            $companyProfile->logo = $this->storeLogo($request);
        }

        $companyProfile->save();

        return response()->json([
            'message' => 'Company profile updated.',
            'profile' => $companyProfile->fresh(),
        ]);
    }

    /**
     * POST /api/admin/company-profiles/{companyProfile}/activate
     * Marks this profile as THE active one; every other profile is deactivated.
     */
    public function activate(CompanyProfile $companyProfile): JsonResponse
    {
        $companyProfile->activate();

        return response()->json([
            'message' => 'Company profile activated.',
            'profile' => $companyProfile->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/company-profiles/{companyProfile}
     */
    public function destroy(CompanyProfile $companyProfile): JsonResponse
    {
        $wasActive = $companyProfile->is_active;
        $companyProfile->delete();

        // Never leave the site with zero active profiles if one still exists.
        if ($wasActive) {
            CompanyProfile::orderBy('id')->first()?->activate();
        }

        return response()->json(['message' => 'Company profile deleted.']);
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'company_name'    => ['required', 'string', 'max:160'],
            'company_slogan'  => ['nullable', 'string', 'max:255'],
            'about_company'   => ['nullable', 'string', 'max:2000'],
            'support_number'  => ['nullable', 'string', 'max:60'],
            'phone'           => ['nullable', 'string', 'max:60'],
            'email'           => ['nullable', 'email', 'max:160'],
            'whatsapp'        => ['nullable', 'string', 'max:60'],
            'address'         => ['nullable', 'string', 'max:400'],
            'working_hours'   => ['nullable', 'string', 'max:160'],
            'map_embed'       => ['nullable', 'string', 'max:3000'],
            'facebook'        => ['nullable', 'string', 'max:255'],
            'instagram'       => ['nullable', 'string', 'max:255'],
            'linkedin'        => ['nullable', 'string', 'max:255'],
            'youtube'         => ['nullable', 'string', 'max:255'],
            'footer_about'    => ['nullable', 'string', 'max:1000'],
            'is_active'       => ['nullable', 'boolean'],
            'logo'            => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:2048'],
        ]);
    }

    private function storeLogo(Request $request): string
    {
        $file = $request->file('logo');
        $name = 'logo-' . time() . '.' . $file->getClientOriginalExtension();
        $dir  = public_path('Contents/images');
        if (! is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $file->move($dir, $name);

        return '/Contents/images/' . $name;
    }
}
