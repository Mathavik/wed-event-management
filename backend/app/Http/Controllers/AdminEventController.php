<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class AdminEventController extends Controller
{
    /**
     * GET /admin/events
     * List all events
     */
    public function index()
    {
        try {
            $events = Event::select('id', 'title', 'description', 'image', 'tags', 'created_at')->get();
            return response()->json($events, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch events',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /admin/events/{id}
     * Get single event
     */
    public function show($id)
    {
        try {
            $event = Event::find($id);
            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }
            return response()->json($event, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /admin/events
     * Create new event
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|string|max:255',
                'tags' => 'nullable|string|max:255',
            ]);

            // Ensure nullable fields have default empty string
            $data = $request->only('title', 'description', 'image', 'tags');
            $data['image'] = $data['image'] ?? '';
            $data['tags'] = $data['tags'] ?? '';

            $event = Event::create($data);

            return response()->json($event, 201);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $ve->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /admin/events/{id}
     * Update event
     */
    public function update(Request $request, $id)
    {
        try {
            $event = Event::find($id);
            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|string|max:255',
                'tags' => 'nullable|string|max:255',
            ]);

            $data = $request->only('title', 'description', 'image', 'tags');
            $data['image'] = $data['image'] ?? $event->image;
            $data['tags'] = $data['tags'] ?? $event->tags;

            $event->update($data);

            return response()->json($event, 200);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $ve->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE /admin/events/{id}
     */
    public function destroy($id)
    {
        try {
            $event = Event::find($id);
            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            $event->delete();
            return response()->json(['message' => 'Event deleted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete event',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}