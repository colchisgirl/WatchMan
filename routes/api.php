<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/login', 'Auth\LoginController@login');
// Route::post('/logout', 'Auth\LoginControlller@logout');

// Route::get('/landmarks',                'LandmarkController@index')->name('landmarks.index');
// Route::get('/landmarks/{landmark_id}',  'LandmarkController@show')->name('landmarks.show');

Route::post('/user/register', 'Auth\RegisterController@createUser')->name('user.register');
Route::post('/organization/register', 'Auth\RegisterController@createOrg')->name('organization.register');

// Route::group(['middleware' => ['auth:api']], function ($group) {
    
// });
