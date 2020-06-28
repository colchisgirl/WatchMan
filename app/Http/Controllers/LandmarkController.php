<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Landmark;

class LandmarkController extends Controller
{
    public function index()
    {
        $landmarks = Landmark::all();

        return view('landmarks.index', compact('landmarks'));
    }

    public function show($landmark_id)
    {
        $landmark = Landmark::findOrFail($landmark_id);

        return view('landmarks.show', compact('landmark'));
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
    // if (\Gate::allows('admin')){
        //delete the review
        $landmark = Landmark::findOrFail($landmark_id);
        $landmark->delete();

        return redirect(action('LandmarkController@index', $landmark->id));

    // }

    return redirect()->action('BookController@show', [ $book_id ]);
    } 
}
