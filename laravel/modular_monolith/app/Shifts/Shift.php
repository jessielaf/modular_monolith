<?php
namespace App\Shifts;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    public $title;
    public $start;
    public $end;

    public $fillable = ['title', 'start', 'end'];
    public $timestamps = false;

    public function employees()
    {
        return $this->belongsToMany(\App\Employees\Api::getModel());
    }
}
