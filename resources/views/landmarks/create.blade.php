@extends('layouts.layout')

@section('content')

        <form action="{{ route('landmarks.store')}}" method="post">
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
            <label for="">City</label>
            <input type="text" name="city" value="">
        </div>
        <div>
            <label for="">Street</label>
            <input type="text" name="street" value="">
        </div>
        <div>
            <label for="">House Number</label>
            <input type="text" name="house_number" value="">
        </div>
        <div>
            <label for="">Architect (optional)</label>
            <input type="text" name="architect" value="">
        </div>
        <div>
            <label for="">Built_in</label>
            <input type="text" name="built_in" value="">
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