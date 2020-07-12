<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


Route::view('/', 'welcome');
Route::view('/map', 'welcome');
Route::view('/map/createLandmark', 'welcome');
Route::view('/landmarks/{landmark_id}', 'welcome');
Route::view('/landmarks/{landmark_id}/createEvent', 'welcome');
Route::view('/landmarks/{landmark_id}/{event_id}', 'welcome');

Route::view('/dashboard', 'welcome');

Route::view('/register', 'welcome');
Route::view('/login', 'welcome');



Route::prefix('api')->group(function () {

    // API routes go here

    Route::namespace('Auth')->group(function () {
        Route::post('/login', 'LoginController@login');
        Route::post('/logout', 'LoginController@logout');
    });

    Route::get('/landmarks',                'LandmarkController@index')->name('landmarks.index');
    Route::get('/landmarks/{landmark_id}',  'LandmarkController@show')->name('landmarks.show');
    

    Route::post('/user/register', 'Auth\RegisterController@createUser')->name('user.register');
    Route::post('/organization/register', 'Auth\RegisterController@createOrg')->name('organization.register');

    Route::get('/events/{event_id}', 'EventController@show');
    Route::get('/{user_id}/landmarks', 'LandmarkController@myLandmarks');

    
    

    Route::group(['middleware' => ['auth:web']], function () {

        // API routes with authentication go here

        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::post('/events/create',  'EventController@create')->name('events.create');

        Route::post('/landmarks/create',  'LandmarkController@create')->name('landmarks.create');

        Route::resource('fileupload', 'ImageController');

        Route::post('/landmarks/{landmark_id}/tracking', 'TrackingController@index');
    });
});


// Authentication routing

Auth::routes();
// Route::get('/home', 'HomeController@index')->name('home');


// Landmarks routing

// Route::get('/landmarks',                    'LandmarkController@index')     ->name('landmarks.index');
// Route::get('/landmarks/{landmark_id}',      'LandmarkController@show')      ->name('landmarks.show')->where('landmark_id', '[0-9]+');

// Route::get('/landmarks/create',             'LandmarkController@create')    ->name('landmarks.create');
// Route::post('/landmarks',                   'LandmarkController@store')     ->name('landmarks.store');
// Route::get('/landmarks/{landmark_id}/edit', 'LandmarkController@edit')      ->name('landmarks.edit')->where('landmark_id', '[0-9]+');
// Route::put('/landmarks/{landmark_id}',      'LandmarkController@update')    ->name('landmarks.update')->where('landmark_id', '[0-9]+');

// Route::delete('/landmarks/{landmark_id}/delete', 'LandmarkController@deleteLandmark')->name('landmarks.deleteLandmark');

// Route::get('/mylandmarks',                    'LandmarkController@myLandmarks')     ->name('landmarks.myLandmarks');


// Events routing

Route::get('/events',                   'EventController@index')->name('events.index');
Route::get('/events/{event_id}',         'EventController@show')->name('events.show')->where('event_id', '[0-9]+');

Route::get('/events/create',            'EventController@create')->name('events.create');
Route::post('/events',                  'EventController@store')->name('events.store');
Route::get('/events/{event_id}/edit',   'EventController@edit')->name('events.edit')->where('event_id', '[0-9]+');
Route::put('/events/{event_id}',        'EventController@update')->name('events.update')->where('event_id', '[0-9]+');

Route::delete('/events/{event_id}/delete', 'EventController@deleteEvent')->name('events.deleteEvent');


// Users routing

Route::get('/user', 'UserController@show')->name('users.show');
Route::get('/edit/user/', 'UserController@edit')->name('users.edit');
Route::post('/edit/user/', 'UserController@update')->name('users.update');

Route::get('/edit/password/user', 'UserController@passwordEdit')->name('users.password');
Route::post('/edit/password/user', 'UserController@passwordUpdate')->name('users.password');

// Organizations routing
Route::get('/organization/register', 'OrganizationController@store')->name('organizations.register');
Route::get('/organization/{organization_id}', 'OrganizationController@show')->name('organizations.show');
