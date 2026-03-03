<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enquiry extends Model
{
    use HasFactory;

    protected $table = 'enquiries';

    protected $fillable = [
        'provider_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'wedding_city',
        'wedding_date',
        'budget',
        'interested_services',
        'status',
    ];

    protected $casts = [
        'interested_services' => 'array',
        'wedding_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationship with ServiceProvider
    public function provider()
    {
        return $this->belongsTo(ServiceProviders::class, 'provider_id');
    }
}
