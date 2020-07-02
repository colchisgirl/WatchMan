<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropColumn('organization_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_organization')->after('address');
            $table->string('description', 1200)->nullable()->after('is_organization');
            $table->string('profile_img', 255)->nullable()->after('description');
            $table->boolean('is_verified')->after('profile_img');
        });
        

            
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('organization_id')->unsigned()->nullable();
          $table->foreign('organization_id')->references('id')->on('organizations');
            $table->dropColumn('is_organization');
            $table->dropColumn('description');
            $table->dropColumn('profile_img');
            $table->dropColumn('is_verified');
        });
    }
}
