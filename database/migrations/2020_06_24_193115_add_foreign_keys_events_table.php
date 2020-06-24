<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
        
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('landmark_id')->references('id')->on('landmarks');
        });

        Schema::table('landmarks', function (Blueprint $table) {
        
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('comments', function (Blueprint $table) {
        
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('landmark_id')->references('id')->on('landmarks');
            $table->foreign('events_id')->references('id')->on('events');
            $table->foreign('reply_to_id')->references('id')->on('comments');
        });

        Schema::table('images', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('url');                  // CREATING COLUMN IN TABLE IMAGES! BE CAREFUL WHEN ROLLING BACK

        });

        Schema::table('images', function (Blueprint $table) {
            DB::table('images')->update(['user_id' => 1]);
        
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('landmark_id')->references('id')->on('landmarks');
            $table->foreign('event_id')->references('id')->on('events');
        });

        Schema::table('tracking', function (Blueprint $table) {
        
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('landmark_id')->references('id')->on('landmarks');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('organization_id')->change();
            $table->foreign('organization_id')->references('id')->on('organizations');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['landmark_id']);

        });

        Schema::table('landmarks', function (Blueprint $table) {
        
            $table->dropForeign(['user_id']);
        });

        Schema::table('comments', function (Blueprint $table) {
        
            $table->dropForeign(['user_id']);
            $table->dropForeign(['landmark_id']);
            $table->dropForeign(['events_id']);
            $table->dropForeign(['reply_to_id']);
        });

        Schema::table('images', function (Blueprint $table) {

            $table->dropForeign(['user_id']);
            $table->dropForeign(['landmark_id']);
            $table->dropForeign(['event_id']);

            $table->dropColumn(['user_id']);
        });

        Schema::table('tracking', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['landmark_id']);

        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);

        });
    }
}
