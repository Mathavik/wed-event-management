<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ServiceProviders;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTER (user only)
    // vendor registration is handled separately via ServiceProvidersController
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|in:bride,groom,user,admin',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'city' => $request->city,
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ]);
    }

    // LOGIN (unified for users, vendors and admin)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->email;
        $password = $request->password;

        // 1. check admin hardcoded credentials (could be moved to .env)
        $adminEmail = env('ADMIN_EMAIL', 'admin@example.com');
        $adminPassword = env('ADMIN_PASSWORD', 'secret');

        if ($email === $adminEmail && $password === $adminPassword) {
            // ensure admin row exists in users table
            $admin = User::firstOrCreate(
                ['email' => $adminEmail],
                [
                    'name' => 'Admin',
                    'password' => Hash::make($adminPassword),
                    'role' => 'admin',
                ]
            );

            return response()->json([
                'message' => 'Login successful',
                'user' => $admin
            ]);
        }

        // 2. attempt user login
        $user = User::where('email', $email)->first();
        if ($user && Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ]);
        }

        // 3. attempt vendor login
        $vendor = \App\Models\ServiceProviders::where('email', $email)->first();
        if ($vendor && Hash::check($password, $vendor->password)) {
            // make sure the vendor object has a role property
            $vendor->role = 'vendor';
            return response()->json([
                'message' => 'Login successful',
                'user' => $vendor
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}