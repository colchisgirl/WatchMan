@extends('layouts.layout')

@section('content')

    <h2>{{$landmark->title}} - {{$landmark->built_in}}</h2>
    <h3>{{$landmark->architect}}</h3>
    <p>{{$landmark->description}}</p>
    <p><strong>Address: </strong>{{$landmark->house_number}} {{$landmark->street}}, {{$landmark->city}}</p>
    <div>
        @foreach ($landmark->images as $image)
            <img src = "{{ URL::to('/') }}/img/{{$image->url}}" width="400" />
        @endforeach
    </div>
    <a href="/landmarks/{{$landmark->id}}/edit">edit</a>

    <h2>Events:</h2>
    <ul>
    @foreach ($landmark->events as $event)
        
        <li> <a href="/events/{{$event->id}}">{{$event->title}} - {{$event->user->name}} </a></li>
        
    @endforeach
    </ul>
    
@endsection