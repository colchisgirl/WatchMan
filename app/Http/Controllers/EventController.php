<?php

namespace App\Http\Controllers;
use App\Landmark;
use App\User;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function show($event_id)
    {
        $event = Event::with('images')->findOrFail($event_id);

        return $event;
    }


    public function create(Request $request)
    {

        $request->validate([
            'landmark_id' => 'required|exists:landmarks,id',
            'title' => 'required',
            'description' => 'required'
        ]);

        $event = new Event;
        $event->title = $request->input('title');
        $event->description = $request->input('description');
        $event->landmark_id = $request->input('landmark_id');
        $event->user_id = $request->user()->id;
        $event->alarm = 1;

        $event->save();
 
        return $event;

    }

    public function edit($event_id)
    {
        $event = Event::findOrFail($event_id);
        $event->save();

        return view('events.edit', compact('event'));
    }

    public function update(Request $request, $event_id) 
    {
        $event = Event::findOrFail($event_id);
        
        $event->title = $request->input('title');
        $event->description = $request->input('description');

        $event->save();

        return redirect('/events/' . $event->id);
    }

    public function deleteEvent($event_id) 
    {
    if (\Gate::allows('admin')){

        $event = Event::findOrFail($event_id);
        $event->delete();

        return redirect(action('EventController@index', $event->id));

    }

    return redirect()->action('EventController@show', [ $event_id ]);
    } 
}
