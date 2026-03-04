<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_id',
        'duration_months',
        'amount',
        'status',
        'transaction_id',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function provider()
    {
        return $this->belongsTo(ServiceProviders::class, 'provider_id');
    }
}
