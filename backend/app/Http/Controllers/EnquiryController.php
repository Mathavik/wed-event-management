<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    /**
     * Get all enquiries (for admin)
     */
    public function index()
    {
        $enquiries = Enquiry::with('provider')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'message' => 'Enquiries retrieved successfully',
            'data' => $enquiries
        ]);
    }

    /**
     * Store a new enquiry
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'provider_id' => 'required|exists:service_providerss,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'wedding_city' => 'required|string|max:255',
            'wedding_date' => 'required|date',
            'budget' => 'nullable|string',
            'interested_services' => 'nullable|array',
        ]);

        try {
            $enquiry = Enquiry::create([
                'provider_id' => $validated['provider_id'],
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'wedding_city' => $validated['wedding_city'],
                'wedding_date' => $validated['wedding_date'],
                'budget' => $validated['budget'] ?? null,
                'interested_services' => $validated['interested_services'] ?? [],
                'status' => 'pending',
            ]);

            // Load the provider relationship
            $enquiry = $enquiry->load('provider');

            return response()->json([
                'message' => 'Enquiry submitted successfully!',
                'data' => $enquiry
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit enquiry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific enquiry
     */
    public function show($id)
    {
        $enquiry = Enquiry::with('provider')->findOrFail($id);

        return response()->json([
            'message' => 'Enquiry retrieved successfully',
            'data' => $enquiry
        ]);
    }

    /**
     * Update enquiry status (for admin/vendor)
     */
    public function update(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,contacted,completed,cancelled',
        ]);

        $enquiry->update($validated);

        return response()->json([
            'message' => 'Enquiry updated successfully',
            'data' => $enquiry
        ]);
    }

    /**
     * Delete an enquiry
     */
    public function destroy($id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $enquiry->delete();

        return response()->json([
            'message' => 'Enquiry deleted successfully'
        ]);
    }
}
