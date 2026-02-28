<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // GET /services
    public function index()
    {
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

    // POST /services (Single or Bulk Insert)
    public function store(Request $request)
    {
        $data = $request->all();

        // Detect if it's a bulk insert (array of arrays)
        if (isset($data[0]) && is_array($data[0])) {
            // Validate each item in the array
            $request->validate([
                '*.title' => 'required|string|max:255',
                '*.image' => 'required|string|max:255',
                '*.event_id' => 'required|integer|exists:events,id',
            ]);

            Service::insert($data); // Bulk insert
            return response()->json([
                'message' => 'Services created successfully',
                'data' => $data
            ], 201);
        } else {
            // Single insert
            $request->validate([
                'title' => 'required|string|max:255',
                'image' => 'required|string|max:255',
                'event_id' => 'required|integer|exists:events,id',
            ]);

            $service = Service::create($data);
            return response()->json([
                'message' => 'Service created successfully',
                'data' => $service
            ], 201);
        }
    }
    // GET /services/event/{eventId}
public function getByEvent($eventId)
{
    $services = Service::where('event_id', $eventId)->get();

    if ($services->isEmpty()) {
        return response()->json([
            'message' => 'No services found for this event'
        ], 404);
    }

    return response()->json($services, 200);
}

    // PUT /services/{id}
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'message' => 'Service not found'
            ], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'image' => 'sometimes|required|string|max:255',
            'event_id' => 'sometimes|required|integer|exists:events,id',
        ]);

        $service->update($request->all());

        return response()->json([
            'message' => 'Service updated successfully',
            'data' => $service
        ], 200);
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