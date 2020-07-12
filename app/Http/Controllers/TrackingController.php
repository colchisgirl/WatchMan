<?php

namespace App\Http\Controllers;

use App\Landmark;
use Illuminate\Http\Request;
use App\Tracking;
use Illuminate\Support\Facades\Auth;

class TrackingController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $landmark_id = $request->landmark_id;

        $tracking = Tracking::where(
            ["user_id" => $user_id, "landmark_id" => $landmark_id]
        )->first();

        if ($tracking) {
            $tracking->delete();
        } else {
            $tracking = new Tracking;
            $tracking->user_id = $request->user()->id;
            $tracking->landmark_id = $request->landmark_id;

            $tracking->save();
        }

        return Landmark::findOrFail($landmark_id)->tracking->where('user_id', Auth::id());
    }
}
