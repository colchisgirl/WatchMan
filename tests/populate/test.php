<?php
require_once 'DB.php';
require_once 'DB_functions.php';
$success = connect('localhost', 'watchman', 'root', 'rootroot');
$data = json_decode(file_get_contents('landmarks_images.json'), true);

// ORGANIZATIONS

// foreach($data as $d) {
//     $name = $d['name'];
//     $logo = $d['logo'];
//     $description = $d['description'];
    
//     DB::insert('
//     INSERT into `organizations`
//     (name, logo, description)
//     VALUES (?, ?, ?)', [$name, $logo, $description]);
// }


// USERS

// foreach($data as $d) {
//     $name = $d['name'];
//     $email = $d['email'];
//     $password = $d['password'];
//     $address = $d['address'];
//     $organization_id = $d['organization_id'];
//     $isOnline = $d['isOnline'];
    
//     DB::insert('
//     INSERT into `users`
//     (name, email, password, address, organization_id, isOnline)
//     VALUES (?, ?, ?, ?, ?, ?)', [$name, $email, $password, $address, $organization_id, $isOnline]);
// }


// LANDMARKS

// foreach($data as $d) {
//     $name = $d['title'];
//     $desc = $d['description'];
//     $built = $d['built_in'];
//     $arch = $d['architect'];
//     $city = $d['city'];
//     $street = $d['street'];
//     $hn = $d['housenumber'];
//     $protected = $d['protected'];
//     DB::insert('
//     INSERT into `landmarks`
//     (title, description, architect,  built_in, protected, city, street, house_number)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [$name, $desc, $arch, $built, $protected, $city, $street, $hn]);
// }


// IMAGES

// foreach($data as $d) {
//     $url = $d['url'];
//     $lid = $d['landmark_id'];
//     DB::insert('
//     INSERT into `images`
//     (url, landmark_id)
//     VALUES (?, ?)', [$url, $lid]);
// }