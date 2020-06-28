<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\User;
use App\Event;
use App\Landmark;

class UserController extends Controller
{
    public function show()
    {
        // $user = User::findOrFail(\Auth::id());
        if (Auth::user()) {

            $user = User::find(Auth::user()->id);

            return view('users.show')->withUser($user);
        }   
    }

    public function edit() 
    {

        if (Auth::user()) {
            
            $user = User::find(Auth::user()->id);

            if($user) {
                return view('users.edit')->withUser($user);
            } else {
                return redirect()->back();
            }   
        } else {
            return redirect()->back();
        }
    }

    public function update(Request $request)
    {
        $user = User::find(Auth::user()->id);

        if($user) {
            $validate = null;

            if (Auth::user()->email === $request['email']) {
                $validate = $request->validate([
                    'name' => 'required|min:2',
                    'email' => 'required|email',
                    'address' => 'required|min:5'
                ]);
            } else {
                $validate = $request->validate([
                'name' => 'required|min:2',
                'email' => 'required|email|unique:users',
                'address' => 'required|min:5'
            ]);
            }

            if ($validate) {
                
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->address = $request['address'];

            $user->save();
            
            $request->session()->flash('success', 'Your details have been saved!');

            return redirect()->back();
            }   else {
                return redirect()->back();
            }

        } else {
            return redirect()->back();
        }
    }

    public function passwordEdit() 
    {
        if (Auth::user()) {
                return view('users.password');
            } else {
                return redirect()->back();
            }   
        }

    public function passwordUpdate(Request $request)
    {
        $validate = $request->validate([
            'oldPassword' => 'required|min:7',
            'password' => 'required|min:7|required_with:password_confirmation|confirmed'
        ]);

        $user = User::find(Auth::user()->id);

        if($user) {
            if (Hash::check($request['oldPassword'], $user->password) && $validate)
            {
                $user->password = Hash::make($request['password']);
                $user->save();

                $request->session()->flash('success', 'Your password was changed!');
                return redirect()->back();

            } else {
                $request->session()->flash('error', 'The password you entered is not correct.');
                return redirect()->route('users.password');
            }
        }
    }


}
