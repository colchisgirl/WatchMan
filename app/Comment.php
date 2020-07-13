<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
