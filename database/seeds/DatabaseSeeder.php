<?php

use App\Image;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Landmark;
use App\Organization;

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
        $landm = json_decode( file_get_contents( storage_path('app/populate/Landmarks.json') ));
        $images = json_decode( file_get_contents( storage_path('app/populate/landmarks_images.json') ));

        DB::table('images')->delete();
        DB::table('landmarks')->delete();
        DB::table('users')->delete();


        foreach ($data as $i => $datauser) 
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

        $landmark_ids = [];

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

            $landmark_ids[] = $landmark->id;
        }

        foreach($images as $dataimage)
        {
            $image = new Image;
            $image->event_id = null;
            $image->landmark_id = array_shift($landmark_ids);
            $image->user_id = $user->id;
            $image->url = $dataimage->url;

            $image->save();
        }

    }
}
