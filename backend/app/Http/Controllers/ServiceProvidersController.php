<?php

namespace App\Http\Controllers;

use App\Models\ServiceProviders;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;

class ServiceProvidersController extends Controller
{
    // 📌 Get providers by service
    public function index($service_id)
    {
        $providers = ServiceProviders::where('service_id', $service_id)->get();
        return response()->json($providers);
    }

    // 📌 Register new provider

public function store(Request $request)
{
    $request->validate([
        'service_id' => 'required|exists:services,id',
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:service_providerss,email',
        'password' => 'required|min:6',
        'contact' => 'required|string|max:255',
        'role' => 'sometimes|in:vendor',
    ]);

    $provider = ServiceProviders::create([
        'service_id' => $request->service_id,
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'contact' => $request->contact,
        'description' => $request->description,
        'experience' => $request->experience,
        'image' => $request->image,
        // always set vendor role
        'role' => 'vendor',
    ]);

    return response()->json([
        'message' => 'Provider registered successfully',
        'data' => $provider
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