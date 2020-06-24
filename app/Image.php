<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function landmark()
    {
        return $this->belongsTo(Landmark::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
