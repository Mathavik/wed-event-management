<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventService;

class EventController extends Controller
{
    // GET ALL EVENTS
    public function index()
    {
        return response()->json(Event::all());
    }

    // GET SINGLE EVENT
    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    // GET EVENT WITH SERVICES (IMPORTANT 🔥)
    public function details($id)
    {
        $event = Event::with('services')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    // CREATE EVENT
    public function store(Request $request)
    {
        $event = Event::create($request->all());

        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ], 201);
    }

    // UPDATE EVENT
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->update($request->all());

        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    // DELETE EVENT
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }
}