<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'reply_to_id');
    }
    
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function event() {
        return $this->belongsTo(Event::class);
    }
}
