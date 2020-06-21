<?php

use Illuminate\Database\Seeder;

class LandmarksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode( file_get_contents( storage_path('landmarks.json') ) );

<<<<<<< Updated upstream
        dd($data);
=======
       dd($data);
>>>>>>> Stashed changes
    //    \DB::statement('TRUNCATE TABLE `landmarks`');

    //    foreach ($data as $landmark) {

    //        // insert a record into the books table
    //        $new_landmark = new Landmark;
    //        $new_landmark->title         = $landmark->title;
    //        $new_landmark->description   = $landmark->description;
    //        $new_landmark->built_in   = $landmark->built_in;
    //        $new_landmark->architect = $landmark->architect;
    //        $new_landmark->city_id = $landmark->city_id;
    //        $new_landmark->street = $landmark->street;
    //        $new_landmark->house_number = $landmark->housenumber;
    //        $new_landmark->protected = $landmark->protected;
    //        $new_landmark->type_id = $landmark->protected;
    //        dd($data);

    //        $new_book->save();

    //        echo "Landmark {$new_landmark->tile} inserted.\n";
    //    }
    }
}
