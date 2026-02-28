<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminUserController extends Controller
{
    /**
     * GET /admin/users
     * Return all users.
     */
    public function index()
    {
        // Select only the columns you want to expose
        $users = User::select('id', 'name', 'email', 'phone', 'city', 'role', 'created_at')->get();

        return response()->json($users, 200);
    }

    /**
     * GET /admin/users/{id}
     * Return a single user by ID
     */
    public function show($id)
    {
        $user = User::select('id', 'name', 'email', 'phone', 'city', 'role', 'created_at')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * POST /admin/users
     * Optional: Create new user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string',
            'city' => 'nullable|string',
            'role' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city,
            'role' => $request->role,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($user, 201);
    }

    /**
     * PUT /admin/users/{id}
     * Optional: Update user
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'nullable|string',
            'city' => 'nullable|string',
            'role' => 'sometimes|string',
            'password' => 'nullable|string|min:6',
        ]);

        if ($request->has('password')) {
            $request->merge(['password' => bcrypt($request->password)]);
        }

        $user->update($request->only('name', 'email', 'phone', 'city', 'role', 'password'));

        return response()->json($user, 200);
    }

    /**
     * DELETE /admin/users/{id}
     * Optional: Delete user
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}