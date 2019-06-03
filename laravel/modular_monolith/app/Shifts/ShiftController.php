<?php
namespace App\Shifts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function index()
    {
        return response()->json(Shift::with(['employees'])->get());
    }
    
    public function store(Request $request)
    {
        $shiftArray = $request->all();
        $shiftArray['start'] = \Carbon\Carbon::parse($shiftArray['start']);
        $shiftArray['end'] = \Carbon\Carbon::parse($shiftArray['end']);

        $shift = Shift::create($shiftArray);

        $shift->employees()->sync($shiftArray['employees']);

        return $shift;
    }

    public function show($id)
    {
        return Shift::with(['employees'])->find($id);
    }
}
