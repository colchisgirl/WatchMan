<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    protected $table = 'tracking';

    public function landmark()
    {
        return $this->belongsTo(Landmark::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
