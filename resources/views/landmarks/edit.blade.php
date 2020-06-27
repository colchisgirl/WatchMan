@extends('layouts.layout')

@section('content')

    @if($landmark->id)
        <form action="{{ route('landmarks.update', [$landmark->id]) }}" method="post">
        @method('PUT')
    @else 
        <form action="{{ route('landmarks.store')}}" method="post">
    @endif
        @csrf
        <div>
            <label for="">Title</label>
            <input type="text" name="title" value="{{ old('title', $landmark->title) }}">
        </div>
        <div>
            <label for="">Description</label>
            <input type="text" name="description" value="{{ old('description', $landmark->description) }}">
        </div>
        <div>
            <label for="">City</label>
            <input type="text" name="city" value="{{ old('city', $landmark->city) }}">
        </div>
        <div>
            <label for="">Street</label>
            <input type="text" name="street" value="{{ old('street', $landmark->street) }}">
        </div>
        <div>
            <label for="">House Number</label>
            <input type="text" name="house_number" value="{{ old('house_number', $landmark->house_number) }}">
        </div>
        <div>
            <label for="">Architect (optional)</label>
            <input type="text" name="architect" value="{{ old('architect', $landmark->architect) }}">
        </div>
        <div>
            <label for="">Built_in</label>
            <input type="text" name="built_in" value="{{ old('built_in', $landmark->built_in) }}">
        </div>
        <div>
            <input type="checkbox" name="protected">
            <label for="">Is this landmark protected?</label>
        </div>
        <div>
            @foreach ($landmark->images as $image)
               <p>{{$image->url}}</p>
               <img src = "{{ asset('./img/{{$image->url}}') }}" />
            @endforeach
        </div>
        <div>
            <input type="submit" value="Save">
        </div>
    </form>

@endsection