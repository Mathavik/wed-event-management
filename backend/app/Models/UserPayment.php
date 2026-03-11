<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPayment extends Model
{
  protected $fillable = [
    'enquiry_id',
    'customer_name',
    'customer_email',
    'amount',
    'admin_commission',
    'vendor_amount',
    'payout_status',
    'bank',
    'card_last4'
];
}