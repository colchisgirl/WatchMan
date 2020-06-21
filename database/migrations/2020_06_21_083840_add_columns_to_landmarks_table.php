<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToLandmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('landmarks', function (Blueprint $table) {
            $table->string('architect', 127)->nullable()->after('description');
            $table->string('built_in', 127)->nullable()->after('architect');
            $table->boolean('protected')->after('built_in');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('landmarks', function (Blueprint $table) {
            $table->dropColumn('protected');
            $table->dropColumn('built_in');
            $table->dropColumn('architect');
        });
    }
}
