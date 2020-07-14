<?php

use App\Image;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Landmark;
use App\Event;
use App\Comment;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode( file_get_contents( storage_path('app/populate/users.json') ));
        $landm = json_decode( file_get_contents( storage_path('app/populate/landmarks.json') ));
        $images = json_decode( file_get_contents( storage_path('app/populate/images.json') ));
        $events = json_decode( file_get_contents( storage_path('app/populate/events.json') ));
        $comments = json_decode( file_get_contents( storage_path('app/populate/comments.json') ));

        DB::table('images')->delete();
        DB::table('comments')->delete();
        DB::table('events')->delete();
        DB::table('landmarks')->delete();
        DB::table('users')->delete();

        DB::statement('alter table `images` auto_increment = 1');
        DB::statement('alter table `comments` auto_increment = 1');
        DB::statement('alter table `events` auto_increment = 1');
        DB::statement('alter table `landmarks` auto_increment = 1');
        DB::statement('alter table `users` auto_increment = 1');


        foreach ($data as $datauser) 
        {
            $user = new User;
            $user->name = $datauser->name;
            $user->email = $datauser->email;
            $user->password =  Hash::make($datauser->password);
            $user->address = $datauser->address;
            $user->is_organization = $datauser->is_organization;
            $user->description = $datauser->description;
            $user->profile_img = $datauser->profile_img;
            $user->is_verified = $datauser->is_verified;
            $user->isOnline = $datauser->isOnline;

            $user->save();
        }

        foreach ($landm as $datalandmark) 
        {
            $landmark = new Landmark;
            $landmark->user_id = $user->id;
            $landmark->title = $datalandmark->title;
            $landmark->description = $datalandmark->description;
            $landmark->architect = $datalandmark->architect;
            $landmark->built_in = $datalandmark->built_in;
            $landmark->protected = $datalandmark->protected;
            $landmark->city = $datalandmark->city;
            $landmark->street = $datalandmark->street;
            $landmark->house_number = $datalandmark->housenumber;
            $landmark->latitude = $datalandmark->latitude;
            $landmark->longitude = $datalandmark->longitude;

            $landmark->save();
        }

        foreach($events as $dataevent)
        {
            $event = new Event;
            $event->title = $dataevent->title;
            $event->description = $dataevent->description;
            $event->alarm = $dataevent->alarm;
            $event->landmark_id = $dataevent->landmark_id;
            $event->user_id = $dataevent->user_id;

            $event->save();
        }

        foreach($comments as $datacomment)
        {
            $comment = new Comment;
            $comment->text = $datacomment->text;
            $comment->user_id = $datacomment->user_id;
            $comment->events_id = $datacomment->events_id;
            $comment->landmark_id = $datacomment->landmark_id;
            $comment->reply_to_id = $datacomment->reply_to_id;

            $comment->save();
        }

        foreach($images as $dataimage)
        {
            $image = new Image;
            $image->event_id = $dataimage->event_id;
            $image->landmark_id = $dataimage->landmark_id;
            $image->user_id = $dataimage->user_id;
            $image->url = $dataimage->url;
            

            $image->save();
        }


    }
}
