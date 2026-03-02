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
        $data = $request->all();

        // Bulk insert
        if (isset($data[0]) && is_array($data[0])) {
            $request->validate([
                '*.title' => 'required|string|max:255',
                '*.image' => 'required|string|max:255',
                '*.event_id' => 'required|integer|exists:events,id',
            ]);

            Service::insert($data);

            return response()->json([
                'message' => 'Services created successfully',
                'data' => $data
            ], 201);
        } 
        // Single insert
        else {
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