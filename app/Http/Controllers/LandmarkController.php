<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Landmark;
use Illuminate\Support\Facades\Auth;

class LandmarkController extends Controller
{
    public function index()
    {
        $landmarks = Landmark::with('events', 'images', 'events.user')->get();

        return $landmarks;
    }

    public function show($landmark_id)
    {
        $id =intval($landmark_id);
        $landmark = Landmark::with(['images', 'events', 'user', 'tracking' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->findOrFail($id);
        
        return $landmark;
    }

    public function myLandmarks() {

        return Landmark::where('user_id', Auth::id())->with('images')->get();
    }

    public function create(Request $request)
    {
        $landmark = new Landmark;

        $landmark->title = $request->input('title');
        $landmark->description = $request->input('description');
        $landmark->architect = $request->input('architect');
        $landmark->built_in = $request->input('built_in');
        $landmark->title = $request->input('title');

        $protected = ($request->input('protected') == true) ? 1 : 0;
        $landmark->protected = $protected;

        $landmark->city = $request->input('city');
        $landmark->street = $request->input('street');
        $landmark->house_number = $request->input('house_number');

        $landmark->latitude = $request->input('latitude');
        $landmark->longitude = $request->input('longitude');
        $landmark->user_id = \Auth::id();

        $landmark->save();

        return $landmark;
    }

    public function edit($landmark_id)
    {
        $landmark = Landmark::findOrFail($landmark_id);
        $landmark->save();

        return view('landmarks.edit', compact('landmark'));
    }
    

    public function update(Request $request, $landmark_id) 
    {
        $landmark = Landmark::findOrFail($landmark_id);
        
        $landmark->title = $request->input('title');
        $landmark->description = $request->input('description');
        $landmark->architect = $request->input('architect');
        $landmark->built_in = $request->input('built_in');
        $landmark->title = $request->input('title');

        $protected = ($request->input('protected') == 'on') ? 1 : 0;
        $landmark->protected = $protected;

        $landmark->city = $request->input('city');
        $landmark->street = $request->input('street');
        $landmark->house_number = $request->input('house_number');
        $landmark->user_id = \Auth::id();

        $landmark->save();

        return redirect('/landmarks/' . $landmark->id);
    }

    public function deleteLandmark($landmark_id) 
    {
    if (\Gate::allows('admin')){

        $landmark = Landmark::findOrFail($landmark_id);
        $landmark->delete();

        return redirect(action('LandmarkController@index', $landmark->id));

    }

    return redirect()->action('LandmarkController@show', [ $landmark_id ]);
    } 
}
