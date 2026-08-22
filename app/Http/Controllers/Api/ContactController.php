<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * POST /api/contact  (public)
     * Validates and stores an incoming contact message.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => ['required', 'string', 'max:120'],
            'email'   => ['required', 'email', 'max:160'],
            'phone'   => ['nullable', 'string', 'max:40'],
            'subject' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'min:10', 'max:4000'],
        ]);

        $message = ContactMessage::create($data);

        return response()->json([
            'message' => 'Thanks! Your message has been sent.',
            'id'      => $message->id,
        ], 201);
    }
}
