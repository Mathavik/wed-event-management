<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Payment;


class ServiceProviders extends Model

{
    use HasFactory;

    protected $table = 'service_providerss';

    protected $fillable = [
        'service_id',
        'name',
        'email',
        'password',
        'contact',
        'description',
        'experience',
        'image',
        'role',
        'city',
        'area',
        'price',
        'price_type',
        'rating',
        'reviews_count',
        'is_featured',
        'portfolio_count',
        // new JSON columns to support multi-service pricing and albums
        'service_pricing',
        'albums',
    ];

    protected $hidden = [
        'password',
    ];

    /**
     * Cast JSON columns to arrays automatically.
     */
    protected $casts = [
        'service_pricing' => 'array',
        'albums' => 'array',
        'price' => 'decimal:2',
    ];

    // Relationship
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * A provider can have multiple payments/subscriptions.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class, 'provider_id');
    }
}