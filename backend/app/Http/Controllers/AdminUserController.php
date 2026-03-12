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
    $validated = $request->validate([
        'enquiry_id' => 'required',
        'customer_name' => 'required',
        'customer_email' => 'required|email',
        'amount' => 'required',
        'bank' => 'required',
        'card_number' => 'required'
    ]);

    $amount = $request->amount;

    // commission calculation
    $adminCommission = $amount * 0.20;
    $vendorAmount = $amount * 0.80;

    $cardLast4 = substr($request->card_number, -4);

    $payment = UserPayment::create([
        'enquiry_id' => $request->enquiry_id,
        'customer_name' => $request->customer_name,
        'customer_email' => $request->customer_email,
        'amount' => $amount,
        'admin_commission' => $adminCommission,
        'vendor_amount' => $vendorAmount,
        'payout_status' => 'pending',
        'bank' => $request->bank,
        'card_last4' => $cardLast4
    ]);

    return response()->json([
        'message' => 'Payment recorded successfully',
        'data' => $payment
    ], 201);
}
public function payVendor($id)
{
    $payment = UserPayment::find($id);

    if (!$payment) {
        return response()->json([
            'status' => false,
            'message' => 'Payment not found'
        ]);
    }

    $payment->payout_status = "paid";
    $payment->save();

    return response()->json([
        'status' => true,
        'message' => 'Vendor payout completed'
    ]);
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