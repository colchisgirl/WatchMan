<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Comment;

class CommentController extends Controller
{
    public function show($landmark_id, $event_id){

        $comments = [];

        if($event_id == 'null'){
            return $comments = Comment::with('user')->where('landmark_id', $landmark_id)->whereNull('events_id')->get();
        } else {
            return $comments = Comment::with('user')->whereNull('landmark_id')->where('events_id', $event_id)->get();
        }

        

        return $comments;

    }
    public function store(Request $request)
    {
    	$request->validate([
            'body'=>'required',
        ]);
   
        $input = $request->all();
        $input['user_id'] = auth()->user()->id;
    
        Comment::create($input);

        $comments = Comment::where('');
   
        return $comments;
    }
}
