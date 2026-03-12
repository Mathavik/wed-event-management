<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminPayment extends Model
{
    protected $fillable = [
        'user_payment_id',
        'admin_commission',
        'vendor_amount',
        'payout_status'
    ];

    public function userPayment()
    {
        return $this->belongsTo(UserPayment::class);
    }
}