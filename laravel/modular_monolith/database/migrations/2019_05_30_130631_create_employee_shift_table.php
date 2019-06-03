<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeShiftTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_shift', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('employee_id')->unsigned()->nullable();
            $table->foreign('employee_id')->references('id')
                ->on('employees')->onDelete('cascade');

            $table->integer('shift_id')->unsigned()->nullable();
            $table->foreign('shift_id')->references('id')
                ->on('shifts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shift_employee');
    }
}
