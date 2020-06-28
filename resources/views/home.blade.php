@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                <div className="userlinks">
                    <a href="">My events</a>
                    <br>
                    <a href="">My tracked landmarks</a>
                    <br>
                    <a href="">My notifications</a>
                    <br>
                    <a href="">Account settings</a>
                    

                    
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
