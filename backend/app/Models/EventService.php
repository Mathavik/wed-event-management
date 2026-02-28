<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventService extends Model
{
    protected $fillable = [
    'event_id',
    'name',
    'description',
    'price'
];

public function event()
{
    return $this->belongsTo(Event::class);
}
}
