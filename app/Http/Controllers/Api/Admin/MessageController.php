<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    /**
     * GET /api/admin/messages
     * Latest contact messages for the dashboard table.
     */
    public function index(): JsonResponse
    {
        $messages = ContactMessage::latest()->get([
            'id', 'name', 'email', 'phone', 'subject', 'message', 'is_read', 'created_at',
        ]);

        return response()->json($messages);
    }

    /**
     * DELETE /api/admin/messages/{message}
     */
    public function destroy(ContactMessage $message): JsonResponse
    {
        $message->delete();

        return response()->json(['message' => 'Message deleted.']);
    }
}
