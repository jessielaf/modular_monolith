<?php


namespace App\Employees;


class Api implements \App\Api
{

    static function getModel(): string
    {
        return '\App\Employees\Employee';
    }
}
