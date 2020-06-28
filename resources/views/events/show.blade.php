@extends('layouts.layout')

@section('content')

    <h2>{{$event->title}} - {{$event->built_in}}</h2>
    <p>{{$event->description}}</p>

    <p>Created by: {{$event->user->name}}</p>

    <p>Landmark: {{$event->landmark->title}}</p>

    <div>
        @foreach ($event->images as $image)
            <img src = "{{ URL::to('/') }}/img/{{$image->url}}" width="400" />
        @endforeach
    </div>


    <a href="/events/{{$event->id}}/edit"><button>edit</button></a>

    @can('admin')
    <form action="{{ action('EventController@deleteEvent', $event->id)}}" method="post">
        @method('delete')
        @csrf
        <input type="submit" value="Delete">
    </form>
    @endcan

    
@endsection