<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Landmark;
use DB;

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
        $landmark = Landmark::with('images', 'events', 'user')->findOrFail($id);
        
        return $landmark;
    }

    public function myLandmarks(){

        $landmarks = Landmark::where('user_id', \Auth::id())->get();

        return view('landmarks.myLandmarks', compact('landmarks'));
    }

    public function create() 
    {
        return view('landmarks.create');
    }

    public function store(Request $request)
    {
        $landmark = new Landmark;

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

        return view('landmarks.show', compact('landmark'));
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
