@extends('layouts.layout')

@section('content')

<a href="{{ action('LandmarkController@create')}}"><button>Create New Landmark</button></a>

@foreach ($landmarks as $landmark)
    <a href="/landmarks/{{$landmark->id}}"><h2>{{$landmark->title}} - {{$landmark->built_in}}</h2></a>
    <h3>{{$landmark->architect}}</h3>
    <p>{{$landmark->description}}</p>
    <p><strong>Address: </strong>{{$landmark->house_number}} {{$landmark->street}}, {{$landmark->city}}</p>

    <div>
        @foreach ($landmark->images as $image)
        <img src = "{{ URL::to('/') }}/img/{{$image->url}}" width="400" />
        @endforeach
    </div>

    <a href="/landmarks/{{$landmark->id}}/edit"><button>edit</button></a>

    {{-- delete landmark  --}}

    @can('admin')
    <form action="{{ action('LandmarkController@deleteLandmark', $landmark->id)}}" method="post">
        @method('delete')
        @csrf
        <input type="submit" value="Delete">
    </form>
    @endcan

@endforeach
    
@endsection