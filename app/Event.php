<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public function landmark() 
    {
        return $this->belongsTo(Landmark::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function images() 
    {
        return $this->hasMany(Image::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('reply_to_id');
    }

    
}
