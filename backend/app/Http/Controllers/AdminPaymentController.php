<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserPayment;
use App\Models\AdminPayment;

class AdminPaymentController extends Controller
{
    // Admin fetch all pending user payments
    public function index()
    {
        $payments = UserPayment::where('payout_status', 'pending')->get();
        return response()->json(['data' => $payments]);
    }

    // Admin pays vendor
    public function payVendor($id)
    {
        $userPayment = UserPayment::find($id);

        if (!$userPayment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        if ($userPayment->payout_status === 'paid') {
            return response()->json(['message' => 'Already paid'], 400);
        }

        $adminCommission = $userPayment->amount * 0.1;
        $vendorAmount = $userPayment->amount - $adminCommission;

        // Create record in admin_payments table
        AdminPayment::create([
            'user_payment_id' => $userPayment->id,
            'admin_commission' => $adminCommission,
            'vendor_amount' => $vendorAmount,
            'payout_status' => 'paid'
        ]);

        // Update user payment payout_status
        $userPayment->payout_status = 'paid';
        $userPayment->save();

        return response()->json([
            'message' => 'Vendor paid successfully',
            'user_payment' => $userPayment
        ]);
    }
}
