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
        'bank',
        'card_last4'
    ];
}