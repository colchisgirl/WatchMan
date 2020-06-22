<?php
require_once 'DB.php';
require_once 'DB_functions.php';
$success = connect('localhost', 'watchman', 'root', 'rootroot');
$data = json_decode(file_get_contents('users.json'), true);

foreach($data as $d) {
    $name = $d['name'];
    $email = $d['email'];
    $password = $d['password'];
    $address = $d['address'];
    $organization_id = $d['organization_id'];
    $isOnline = $d['isOnline'];
    
    DB::insert('
    INSERT into `users`
    (name, email, password, address, organization_id, isOnline)
    VALUES (?, ?, ?, ?, ?, ?)', [$name, $email, $password, $address, $organization_id, $isOnline]);
}

// foreach($data as $d) {
//     $name = $d['title'];
//     $desc = $d['description'];
//     $built = $d['built_in'];
//     $arch = $d['architect'];
//     $city_id = $d['city_id'];
//     $street = $d['street'];
//     $hn = $d['housenumber'];
//     $protected = $d['protected'];
//     DB::insert('
//     INSERT into `landmarks`
//     (title, description, architect,  built_in, protected, city_id, street, house_number)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [$name, $desc, $arch, $built, $protected, $city_id, $street, $hn]);
// }

// foreach($data as $d) {
//     $url = $d['url'];
//     $lid = $d['landmark_id'];
//     DB::insert('
//     INSERT into `images`
//     (url, landmark_id)
//     VALUES (?, ?)', [$url, $lid]);
// }