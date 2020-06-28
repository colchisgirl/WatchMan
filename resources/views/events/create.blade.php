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
            <input type="submit" value="Save">
        </div>
    </form>

@endsection