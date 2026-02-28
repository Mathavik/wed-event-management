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

    // Optional: Relation to Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}