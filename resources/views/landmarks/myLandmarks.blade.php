@extends('layouts/layout')

@section('content')
    @foreach ($landmarks as $landmark)
        <p>{{$landmark->title}}</p>
    @endforeach
    
@endsection