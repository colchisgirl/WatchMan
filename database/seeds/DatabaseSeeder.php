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
        $orgs = json_decode( file_get_contents( storage_path('app/populate/organizations.json') ));

        DB::table('images')->delete();
        DB::table('landmarks')->delete();
        DB::table('users')->delete();
        DB::table('organizations')->delete();

        $org_ids = [];

        foreach ($orgs as $dataorg)
        {
            $organization = new Organization;
            $organization->name = $dataorg->name;
            $organization->description = $dataorg->description;
            $organization->logo = $dataorg->logo;

            $organization->save();

            $org_ids[] = $organization->id;
        }

        foreach ($data as $i => $datauser) 
        {
            $user = new User;
            $user->name = $datauser->name;
            $user->email = $datauser->email;
            $user->password = $datauser->password;
            $user->address = $datauser->address;
            $user->isOnline = $datauser->isOnline;
            $user->organization_id = $i > 1 ? null : array_shift($org_ids);

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
