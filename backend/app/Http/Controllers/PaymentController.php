<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserPayment;

class PaymentController extends Controller
{

    // GET ALL PAYMENTS
    public function index()
    {
        $payments = UserPayment::latest()->get();

        return response()->json([
            'status' => true,
            'data' => $payments
        ]);
    }


    // GET SINGLE PAYMENT
    public function show($id)
    {
        $payment = UserPayment::find($id);

        if (!$payment) {
            return response()->json([
                'status' => false,
                'message' => 'Payment not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $payment
        ]);
    }


    // STORE PAYMENT
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

    // get last 4 digits
    $cardLast4 = substr($request->card_number, -4);

    $payment = UserPayment::create([
        'enquiry_id' => $request->enquiry_id,
        'customer_name' => $request->customer_name,
        'customer_email' => $request->customer_email,
        'amount' => $request->amount,
        'bank' => $request->bank,
        'card_last4' => $cardLast4
    ]);

    return response()->json([
        'message' => 'Payment recorded successfully',
        'data' => $payment
    ], 201);
}



    // UPDATE PAYMENT
    public function update(Request $request, $id)
    {
        $payment = UserPayment::find($id);

        if (!$payment) {
            return response()->json([
                'status' => false,
                'message' => 'Payment not found'
            ]);
        }

        $payment->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }


    // DELETE PAYMENT
    public function destroy($id)
    {
        $payment = UserPayment::find($id);

        if (!$payment) {
            return response()->json([
                'status' => false,
                'message' => 'Payment not found'
            ]);
        }

        $payment->delete();

        return response()->json([
            'status' => true,
            'message' => 'Payment deleted successfully'
        ]);
    }
}