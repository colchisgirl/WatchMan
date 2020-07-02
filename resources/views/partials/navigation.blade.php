
    <nav>
        <a href="{{ route('landmarks.index')}}">Landmarks</a>
        @auth
        <a href="{{ route('landmarks.myLandmarks')}}">My Landmarks</a>
        <a href="{{ route('users.edit') }}">Edit details</a>
        @endauth


    </nav>

