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
        'email' => 'required|email|unique:service_providers,email',
        'password' => 'required|min:6',
        'contact' => 'required|string|max:255',
    ]);

    $provider = ServiceProviders::create([
        'service_id' => $request->service_id,
        'name' => $request->name,
        'email' => $request->email,   // ✅ MUST BE HERE
        'password' => Hash::make($request->password), // ✅ MUST BE HERE
        'contact' => $request->contact,
        'description' => $request->description,
        'experience' => $request->experience,
        'image' => $request->image,
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