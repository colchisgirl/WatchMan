<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserController extends Controller
{
    public function show()
    {
        $user = User::findOrFail(\Auth::id());

        return view('users.show', compact('user'));
    }
}
