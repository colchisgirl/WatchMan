<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public function landmark() 
    {
        return $this->belongsTo('App\Landmark', 'landmark_id');
    }

    public function user() 
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    
}
