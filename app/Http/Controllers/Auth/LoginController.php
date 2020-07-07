<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        return [
            'status' => 'fail',
            'message' => 'Wrong login credentials',
            'data' => []
        ];
    }

    protected function sendLoginResponse(Request $request)
    {

        return [
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $request->user()
            ]
        ];
    }

    protected function loggedOut(Request $request)
    {
        return [
            'status' => 'fail',
            'message' => 'Successfully logged out',
            'data' => []
        ];
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return ['status' => 'success'];
    }
}
