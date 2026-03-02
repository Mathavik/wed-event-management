<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // GET /services (optionally filter by event_id)
    public function index(Request $request)
    {
        if ($request->has('event_id')) {
            $eventId = $request->query('event_id');
            $services = Service::where('event_id', $eventId)->get();

            if ($services->isEmpty()) {
                return response()->json([
                    'message' => 'No services found for this event'
                ], 404);
            }

            return response()->json($services, 200);
        }

        return response()->json(Service::all(), 200);
    }

    // GET /services/{id}
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json($service, 200);
    }

    // POST /services (single or bulk insert)
public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'required|image|max:5120', // 5MB limit
        'event_id' => 'required|integer|exists:events,id',
    ]);

    $imageName = time() . '_' . uniqid() . '.' . 
                 $request->file('image')->getClientOriginalExtension();

    $request->file('image')->move(
        public_path('uploads/services'),
        $imageName
    );

    $service = Service::create([
        'title' => $request->title,
        'image' => $imageName,
        'event_id' => $request->event_id,
    ]);

    return response()->json([
        'message' => 'Service created successfully',
        'data' => $service
    ], 201);
}

    // PUT /services/{id}
public function update(Request $request, $id)
{
    $service = Service::findOrFail($id);

    $request->validate([
        'title' => 'nullable|string|max:255',
        'image' => 'nullable|image|max:5120',
    ]);

    // Update title
    if ($request->filled('title')) {
        $service->title = $request->title;
    }

    // Update image only if new image selected
    if ($request->hasFile('image')) {

        $imageName = time() . '_' . uniqid() . '.' .
                     $request->file('image')->getClientOriginalExtension();

        $request->file('image')->move(
            public_path('uploads/services'),
            $imageName
        );

        $service->image = $imageName;
    }

    $service->save();

    return response()->json([
        'message' => 'Service updated successfully',
        'data' => $service
    ]);
}

    // DELETE /services/{id}
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'message' => 'Service not found'
            ], 404);
        }

        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully'
        ], 200);
    }
}