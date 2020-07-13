<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
<<<<<<< HEAD
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'reply_to_id');
=======
    public function notifications()
    {
        return $this->hasMany(Notification::class);
>>>>>>> c77dabe8719f9c7dd80640102bdd5aaca7052f14
    }
}
