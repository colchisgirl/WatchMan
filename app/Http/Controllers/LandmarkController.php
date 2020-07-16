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

    public function search(Request $request){
        $search = 'blue';

        if(!empty($request->input)){
            $search = $request->input( 'search' );
            $landmarks = Landmark::where('title','LIKE','%'.$search.'%')
                ->orWhere('architect','LIKE','%'.$search.'%')
                ->orWhere('street','LIKE','%'.$search.'%')
                ->get();
            if(count($landmarks) > 0)
                return $landmarks;
                else return "No results";
          } else {
            $landmarks = Landmark::all();
          }       
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
    

    public function edit(Request $request) 
    {

        $landmark = Landmark::findOrFail($request->input('landmark_id'));
        
        $landmark->title = $request->input('title');
        $landmark->description = $request->input('description');
        $landmark->architect = $request->input('architect');
        $landmark->built_in = $request->input('built_in');
        $landmark->title = $request->input('title');

        $landmark->city = $request->input('city');
        $landmark->street = $request->input('street');
        $landmark->house_number = $request->input('house_number');

        $landmark->save();

        return $landmark;
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
