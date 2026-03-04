<?php

namespace App\Http\Controllers;

use App\Models\ServiceProviders;
use App\Models\Payment;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ServiceProvidersController extends Controller
{
    // 📌 Get providers by service
    public function index($service_id)
    {
        // when providers can offer multiple services we need to look in json field too
        $providers = ServiceProviders::where(function($q) use ($service_id) {
            $q->where('service_id', $service_id);
            // json contain check for array of objects; Laravel supports ->whereJsonContains
            $q->orWhereJsonContains('service_pricing', [['service_id' => (int) $service_id]]);
        })->get();

        return response()->json($providers);
    }

    // 📌 Register new provider

public function store(Request $request)
{
    // subscription and payment validation added
    $request->validate([
        'service_id' => 'nullable|exists:services,id',
        'service_pricing' => 'nullable|array',
        'service_pricing.*.service_id' => 'required_with:service_pricing|exists:services,id',
        'service_pricing.*.price' => 'required_with:service_pricing|numeric|min:0',
        'subscription_duration' => 'required|in:6,12',
        'payment' => 'required|array',
        'payment.status' => 'required|in:completed',
        'payment.transaction_id' => 'required|string',
        'password' => 'required|min:6',
        'contact' => 'required|string|max:255',
        'city' => 'nullable|string|max:255',
        'area' => 'nullable|string|max:255',
        'role' => 'sometimes|in:vendor',
        'albums' => 'nullable|array',
        // allow empty names (frontend will show warning but not break registration)
        'albums.*.name' => 'sometimes|string|max:255',
        'albums.*.photos' => 'nullable|array',
        'albums.*.photos.*' => 'string',
    ]);

    $providerData = [
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'contact' => $request->contact,
        'description' => $request->description,
        'experience' => $request->experience,
        'image' => $request->image,
        'city' => $request->city,
        'area' => $request->area,
        'role' => 'vendor',
    ];

    // preserve old single service_id for backward compatibility
    if ($request->filled('service_id')) {
        $providerData['service_id'] = $request->service_id;
    }

    if ($request->has('service_pricing') && 
        \Illuminate\Support\Facades\Schema::hasColumn('service_providerss','service_pricing')) {
        $providerData['service_pricing'] = json_encode($request->service_pricing);
        // we can optionally set primary service_id as first entry
        if (empty($providerData['service_id']) && count($request->service_pricing)) {
            $providerData['service_id'] = $request->service_pricing[0]['service_id'];
        }
        // calculate aggregate price or leave price columns null
        $providerData['price'] = null;
        $providerData['price_type'] = null;
    }

    if ($request->has('albums') && 
        \Illuminate\Support\Facades\Schema::hasColumn('service_providerss','albums')) {
        $providerData['albums'] = json_encode($request->albums);
        // update portfolio_count if we want
        $providerData['portfolio_count'] = collect($request->albums)->sum(function ($album) {
            return is_array($album['photos']) ? count($album['photos']) : 0;
        });
    }

    // determine amount based on subscription
    $duration = (int) $request->subscription_duration;
    $amount = $duration === 12 ? 35000.00 : 20000.00;

    // persist provider and payment atomically
    $provider = null;
    $payment = null;

    \DB::transaction(function () use (&$provider, &$payment, $providerData, $duration, $amount, $request) {
        $provider = ServiceProviders::create($providerData);

        $paymentData = [
            'provider_id' => $provider->id,
            'duration_months' => $duration,
            'amount' => $amount,
            'status' => $request->input('payment.status'),
            'transaction_id' => $request->input('payment.transaction_id'),
            'starts_at' => now(),
            'ends_at' => now()->addMonths($duration),
        ];

        $payment = \App\Models\Payment::create($paymentData);
    });

    return response()->json([
        'message' => 'Provider registered successfully',
        'data' => $provider,
        'payment' => $payment
    ], 201);
}

    // 📌 Show single provider
    public function show($id)
    {
        $provider = ServiceProviders::findOrFail($id);
        return response()->json($provider);
    }

    // 📌 Delete provider
    public function destroy($id)
    {
        ServiceProviders::destroy($id);
        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}