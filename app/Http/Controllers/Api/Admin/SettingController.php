<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * GET /api/admin/settings
     * Current settings, to prefill the edit form.
     */
    public function index(): JsonResponse
    {
        return response()->json(Setting::allAsMap());
    }

    /**
     * POST /api/admin/settings   (multipart/form-data)
     * Updates text settings and, if provided, uploads a new logo.
     */
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'site_name'     => ['nullable', 'string', 'max:160'],
            'phone'         => ['nullable', 'string', 'max:60'],
            'email'         => ['nullable', 'email', 'max:160'],
            'whatsapp'      => ['nullable', 'string', 'max:60'],
            'address'       => ['nullable', 'string', 'max:400'],
            'working_hours' => ['nullable', 'string', 'max:160'],
            'map_embed'     => ['nullable', 'string', 'max:3000'],
            'facebook'      => ['nullable', 'string', 'max:255'],
            'instagram'     => ['nullable', 'string', 'max:255'],
            'linkedin'      => ['nullable', 'string', 'max:255'],
            'youtube'       => ['nullable', 'string', 'max:255'],
            'footer_about'  => ['nullable', 'string', 'max:1000'],
            'logo'          => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:2048'],
        ]);

        // Handle logo upload -> public/Contents/images/
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $name = 'logo-' . time() . '.' . $file->getClientOriginalExtension();
            $dir  = public_path('Contents/images');
            if (! is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            $file->move($dir, $name);
            Setting::put('logo', '/Contents/images/' . $name);
        }
        unset($data['logo']);

        // Save the rest of the (text) fields that were sent
        foreach ($data as $key => $value) {
            Setting::put($key, $value);
        }

        return response()->json([
            'message'  => 'Settings saved.',
            'settings' => Setting::allAsMap(),
        ]);
    }
}
