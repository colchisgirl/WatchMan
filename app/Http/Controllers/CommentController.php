<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Comment;

class CommentController extends Controller
{
    public function show($landmark_id, $event_id){

        if($event_id == 'null'){
            return Comment::with('user')->where('landmark_id', $landmark_id)->whereNull('events_id')->get();
        } else {
            return Comment::with('user')->whereNull('landmark_id')->where('events_id', $event_id)->get();
        }

    }
    public function store(Request $request)
    {
    	$request->validate([
            'text'=>'required',
        ]);
   
        $comment = new Comment;
        $comment->text = $request->input('text');
        $comment->landmark_id = $request->input('landmark_id');
        $comment->events_id = $request->input('event_id');
        $comment->user_id = $request->user()->id;
        $comment->reply_to_id = $request->input['reply_to_id'];
        $comment->save();
   

        $comments = [];
        
        $event_id = $request->input('event_id');
        $landmark_id = $request->input('landmark_id');

        if($event_id == null){
            return $comments = Comment::with('user')->where('landmark_id', $landmark_id)->whereNull('events_id')->get();
        } else {
            return $comments = Comment::with('user')->whereNull('landmark_id')->where('events_id', $event_id)->get();
        }
    }
}
