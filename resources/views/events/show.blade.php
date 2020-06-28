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
    <a href="/events/{{$event->id}}/edit"><button>edit</button></a>

    @can('admin')
    <form action="{{ action('EventController@deleteEvent', $event->id)}}" method="post">
        @method('delete')
        @csrf
        <input type="submit" value="Delete">
    </form>
    @endcan

    
@endsection