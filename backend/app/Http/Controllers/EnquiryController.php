<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Enquiry;
use App\Mail\EnquiryMail;
use App\Mail\PaymentRequestMail;

class EnquiryController extends Controller
{

    // ================= ADMIN - GET ALL ENQUIRIES =================

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


    // ================= CREATE ENQUIRY =================

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

// CHECK DATE AVAILABILITY
$existingBooking = Enquiry::where('provider_id', $validated['provider_id'])
    ->where('wedding_date', $validated['wedding_date'])
    ->whereIn('status', ['pending','accepted'])
    ->exists();

if ($existingBooking) {
    return response()->json([
        'message' => 'This vendor is not available on this date'
    ], 409);
}

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

            $enquiry->load('provider');

            // mail to vendor
            Mail::to($enquiry->provider->email)
                ->send(new EnquiryMail($enquiry));

            return response()->json([
                'message' => 'Enquiry submitted successfully',
                'data' => $enquiry
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Failed to submit enquiry',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // ================= SHOW SINGLE ENQUIRY =================

    public function show($id)
    {
        $enquiry = Enquiry::with('provider')->findOrFail($id);

        return response()->json([
            'message' => 'Enquiry retrieved successfully',
            'data' => $enquiry
        ]);
    }


    // ================= ACCEPT ENQUIRY =================

    public function accept($id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $enquiry->status = 'accepted';
        $enquiry->save();

        // send payment request mail
        Mail::to($enquiry->customer_email)
        ->send(new PaymentRequestMail($enquiry));

    return response()->json([
        "message" => "Enquiry accepted and mail sent with payment link"
        ]);
    }


    // ================= REJECT ENQUIRY =================

    public function reject($id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $enquiry->status = 'rejected';
        $enquiry->save();

        return response()->json([
            "message" => "Enquiry rejected successfully"
        ]);
    }


    // ================= UPDATE STATUS =================

    public function update(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,accepted,rejected'
        ]);

        $enquiry->update($validated);

        return response()->json([
            'message' => 'Enquiry updated successfully',
            'data' => $enquiry
        ]);
    }


    // ================= DELETE ENQUIRY =================

    public function destroy($id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $enquiry->delete();

        return response()->json([
            'message' => 'Enquiry deleted successfully'
        ]);
    }


    // ================= VENDOR ENQUIRIES =================

    public function vendorEnquiries($providerId)
    {
        $enquiries = Enquiry::where('provider_id', $providerId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Vendor enquiries retrieved successfully',
            'data' => $enquiries
        ]);
    }


    // ================= VENDOR BOOKINGS =================

    public function vendorBookings($provider_id)
    {
        $enquiries = Enquiry::where('provider_id', $provider_id)
            ->where('status', 'accepted')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            "message" => "Vendor bookings fetched",
            "data" => $enquiries
        ]);
    }


    // ================= ADMIN DASHBOARD =================

    public function adminDashboardStats()
    {
        return response()->json([
            'status' => true,
            'data' => [
                'totalVendors' => \App\Models\ServiceProviders::count(),
                'totalBookings' => Enquiry::count(),
                'totalUsers' => \App\Models\User::count(),
                'pendingBookings' => Enquiry::where('status', 'pending')->count(),
                'totalRevenue' => \App\Models\Payment::where('status', 'completed')->sum('amount')
            ]
        ]);
    }

}