<?php

namespace App\Http\Controllers;
use App\Landmark;
use App\User;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {

        $events = Event::all();

        return view('events.index', compact('events'));
    }

    public function show($event_id)
    {
        $event = Event::findOrFail($event_id);

        return view('events.show', compact('event'));
    }

    public function create() 
    {
        return view('events.create');
    }

    public function store()
    {
        $event = new Event;
        $event->title = $request->input('title');
        $event->description = $request->input('description');
        $event->landmark_id = $request->input('landmark_id');
        $event->user_id = \Auth::id();



    }
}
