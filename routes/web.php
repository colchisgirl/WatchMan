<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Authentication routing
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Landmarks routing

Route::get('/landmarks',                    'LandmarkController@index')     ->name('landmarks.index');
Route::get('/landmarks/{landmark_id}',      'LandmarkController@show')      ->name('landmarks.show')->where('landmark_id', '[0-9]+');

Route::get('/landmarks/create',             'LandmarkController@create')    ->name('landmarks.create');
Route::post('/landmarks',                   'LandmarkController@store')     ->name('landmarks.store');
Route::get('/landmarks/{landmarks_id}/edit','LandmarkController@edit')      ->name('landmarks.edit')->where('landmark_id', '[0-9]+');
Route::put('/landmarks/{landmark_id}',      'LandmarkController@update')    ->name('landmarks.update')->where('landmark_id', '[0-9]+');

Route::delete('/landmarks/{landmark_id}/delete', 'LandmarkController@deleteLandmark')->name('landmarks.deleteLandmark');
