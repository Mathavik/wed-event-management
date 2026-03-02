<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'image',
        'event_id', // <-- add this
    ];
    // Append computed attributes
    protected $appends = ['image_url'];

    // Accessor for full image URL
    public function getImageUrlAttribute()
    {
        return url('uploads/services/'.$this->image);
    }
    // Optional: Relation to Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
      public function providers()
    {
        return $this->hasMany(ServiceProviders::class);
    }
}