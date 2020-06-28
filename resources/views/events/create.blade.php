@extends('layouts.layout')

@section('content')

        <form action="{{ route('events.store')}}" method="post">
        @csrf
        <div>
            <label for="">Title</label>
            <input type="text" name="title" value="">
        </div>
        <div>
            <label for="">Description</label>
            <input type="text" name="description" value="">
        </div>
        <div>
            <label for="">Architect (optional)</label>
            <input type="text" name="architect" value="">
        </div>
        <div>
            <input type="checkbox" name="protected">
            <label for="">Is this landmark protected?</label>
        </div>
        <div>
            <input type="submit" value="Save">
        </div>
    </form>

@endsection