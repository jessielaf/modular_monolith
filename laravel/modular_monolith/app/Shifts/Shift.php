<?php
namespace App\Shifts;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    public $title;
    public $start;
    public $end;

    public function employees()
    {
        return $this->belongsToMany(\App\Employees\Api::getModel());
    }
}
