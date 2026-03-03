<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


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
    ];

    protected $hidden = [
        'password',
    ];

    // Relationship
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}