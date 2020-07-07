@extends('layouts.layout')

@section('content')

<a href="{{ action('EventController@create')}}"><button>Create New Event</button></a>

@foreach ($events as $event)
    <h2>{{$event->title}}</h2>
    <p>{{$event->description}}</p>
    <p>Landmark: {{$event->landmark->title}}</p>
    <p>Created by: {{$event->user->name}}</p>
    <a href="/events/{{$event->id}}/edit"><button>edit</button></a>

    {{-- delete event  --}}

    @can('admin')
        <form action="{{ action('EventController@deleteEvent', $event->id)}}" method="post">
            @method('delete')
            @csrf
            <input type="hidden" name="event_id" value="{{ $event->id }}">
            <input type="submit" value="Delete">
        </form>
    @endcan

@endforeach
    
@endsection