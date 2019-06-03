<?php
namespace App\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return response()->json(Employee::with('shifts')->get());
    }

    public function store(Request $request)
    {
        $employee = $request->all();
        $employee['birth_date'] = \Carbon\Carbon::parse($employee['birth_date']);

        return Employee::create($employee);
    }

    public function show($id)
    {
        return Employee::with('shifts')->find($id);
    }
}
