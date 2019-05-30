<?php
namespace App\Employees;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    public $name;
    public $birth_date;
    public $email;

    public function shifts()
    {
        return $this->belongsToMany(\App\Shifts\Api::getModel())->withTimestamps();
    }
}
