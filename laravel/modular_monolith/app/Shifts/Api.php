<?php


namespace App\Shifts;


class Api implements \App\Api
{

    static function getModel(): string
    {
        return '\App\Shifts\Shift';
    }
}
