@extends('layouts.layout')

@section('content')

    <h2>{{$event->title}} - {{$event->built_in}}</h2>
    <p>{{$event->description}}</p>
    <p><strong>Address: </strong>{{$event->house_number}} {{$event->street}}, {{$event->city}}</p>
    <div>
        @foreach ($event->images as $image)
            <img src = "{{ URL::to('/') }}/img/{{$image->url}}" width="400" />
        @endforeach
    </div>
    <a href="/events/{{$event->id}}/edit">edit</a>

    
@endsection