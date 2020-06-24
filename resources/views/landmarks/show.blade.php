@extends('layouts.layout')

@section('content')

    <h2>{{$landmark->title}} - {{$landmark->built_in}}</h2>
    <h3>{{$landmark->architect}}</h3>
    <p>{{$landmark->description}}</p>
    <p><strong>Address: </strong>{{$landmark->house_number}} {{$landmark->street}}, {{$landmark->city}}</p>
    <a href="/landmarks/{{$landmark->id}}/edit">edit</a>

    
@endsection