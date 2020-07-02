<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Landmark;
use App\Image;
use App\Event;

class ApiController extends Controller
{
    public function popups()
    {
        $landmarks = Landmark::all();

        $images = Images::all();

    }
}
