<?php

namespace App\Http\Controllers;

use App\Models\ServiceProviders;
use App\Models\Payment;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;

class ServiceProvidersController extends Controller
{
    // 📌 Get providers by service
    public function index($service_id)
    {
        $providers = ServiceProviders::where(function($q) use ($service_id) {
            $q->where('service_id', $service_id);
            // JSON contain check for array of objects
            $q->orWhereJsonContains('service_pricing', [['service_id' => (int) $service_id]]);
        })->get();

        return response()->json($providers);
    }


    public function allProviders()
{
    $providers = ServiceProviders::all();

    return response()->json([
        'status' => true,
        'data' => $providers
    ]);
}
    // 📌 Register new provider
    public function store(Request $request)
    {
        // 1. Validation
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
            'name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:service_providerss,email',
            'city' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'role' => 'sometimes|in:vendor',
            'albums' => 'nullable|array',
            'albums.*.name' => 'nullable|string|max:255',
            'albums.*.photos' => 'nullable|array',
            'description' => 'nullable|string',
            'experience' => 'nullable|string|max:255',
            'image' => 'nullable|string',
        ]);

        $providerData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact' => $request->contact,
            'description' => $request->description,
            'experience' => $request->experience,
            'city' => $request->city,
            'area' => $request->area,
            'role' => 'vendor',
        ];

        // 2. Handle Profile Image (Base64)
        if (!empty($request->image) && preg_match('/^data:image\/([a-zA-Z]+);base64,/', $request->image)) {
            $matches = [];
            preg_match('/^data:image\/(\w+);base64,/', $request->image, $matches);
            $extension = $matches[1] ?? 'png';
            $fileName = 'provider_' . time() . '.' . $extension;
            $fileData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->image));
            
            Storage::disk('public')->put('uploads/providers/' . $fileName, $fileData);
            $providerData['image'] = $fileName;
        }

        // 3. Handle Service Pricing (JSON Storage)
        if ($request->has('service_pricing')) {
            // Laravel Model Cast will convert this array to JSON automatically
            $providerData['service_pricing'] = $request->service_pricing;

            // Backward compatibility for single service_id and price
            if (count($request->service_pricing) > 0) {
                $providerData['service_id'] = $request->service_pricing[0]['service_id'];
                $providerData['price'] = $request->service_pricing[0]['price'];
            }
        } elseif ($request->filled('service_id')) {
            $providerData['service_id'] = $request->service_id;
        }

        // 4. Handle Albums (JSON Storage)
     if ($request->has('albums')) {

    $albums = [];

    foreach ($request->albums as $album) {

        $photos = [];

        if (!empty($album['photos'])) {

            foreach ($album['photos'] as $photo) {

                if (preg_match('/^data:image\/(\w+);base64,/', $photo, $type)) {

                    $extension = $type[1];

                    $fileName = 'album_' . time() . rand(100,999) . '.' . $extension;

                    $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $photo));

                    Storage::disk('public')->put('uploads/albums/' . $fileName, $image);

                    $photos[] = asset('storage/uploads/albums/' . $fileName);
                }
            }
        }

        $albums[] = [
            'name' => $album['name'] ?? '',
            'photos' => $photos
        ];
    }

    $providerData['albums'] = $albums;

    $providerData['portfolio_count'] = collect($albums)->sum(function ($album) {
        return count($album['photos']);
    });
}

        // 5. Subscription & Payment Logic
        $duration = (int) $request->subscription_duration;
        $amount = $duration === 12 ? 35000.00 : 20000.00;

        $provider = null;
        $payment = null;

        // Atomic Transaction
        DB::transaction(function () use (&$provider, &$payment, $providerData, $duration, $amount, $request) {
            $provider = ServiceProviders::create($providerData);

            $payment = Payment::create([
                'provider_id' => $provider->id,
                'duration_months' => $duration,
                'amount' => $amount,
                'status' => $request->input('payment.status'),
                'transaction_id' => $request->input('payment.transaction_id'),
                'starts_at' => now(),
                'ends_at' => now()->addMonths($duration),
            ]);
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
        return response()->json(['message' => 'Deleted successfully']);
    }
}



