<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('lastActivityDate')->nullable()->change();
            $table->string('organization_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('users')->update([
            'lastActivityDate' => "",
            'organization_id' => 0
        ]);
        Schema::table('users', function (Blueprint $table) {
            $table->string('lastActivityDate')->nullable(false)->change();
            $table->string('organization_id')->nullable(false)->change();
        });
    }
}
