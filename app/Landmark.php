<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Landmark extends Model
{
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

<<<<<<< HEAD
    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('reply_to_id');
=======
    public function tracking()
    {
        return $this->hasMany(Tracking::class);
>>>>>>> c77dabe8719f9c7dd80640102bdd5aaca7052f14
    }
}
