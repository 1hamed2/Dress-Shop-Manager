<?php

namespace App\Http\Controllers;

use App\Models\StaffCommission;
use App\Http\Requests\StoreStaffCommissionRequest;
use App\Http\Requests\UpdateStaffCommissionRequest;
use App\Http\Resources\StaffCommissionResources;
use App\Http\Resources\StaffResources;
use App\Models\Staff;
use App\Models\Sale;



class StaffCommissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = StaffCommission::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if (request('staff')) {
            $query->whereHas('staff', function ($q) {
                $q->where('name', 'like', '%' . request('staff') . '%');
            });
        }


        
        $staffCommissions = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Staff_commissions/Index', [
            "staffCommissions" => StaffCommissionResources::collection($staffCommissions),
            "queryParams" => request()->query() ?: [],
            "success" => session('success'),
            "updateMsg" => session('updateMsg'),
            "deleteMsg" => session('deleteMsg'),
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $thisMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();
        
        $staff = Staff::query()->orderBy('name', 'asc')->get();

        
        $thisMonthCommissions = Sale::selectRaw('staff_id, SUM(commission) as total')
            ->whereBetween('created_at', [$thisMonth, $thisMonth->copy()->endOfMonth()])
            ->groupBy('staff_id')
            ->get();
        
        $previousMonthCommissions = Sale::selectRaw('staff_id, SUM(commission) as total')
            ->whereBetween('created_at', [$previousMonth, $previousMonth->copy()->endOfMonth()])
            ->groupBy('staff_id')
            ->get();


        return inertia('Staff_commissions/Create', [
            'thisMonthCommissions'     => $thisMonthCommissions,
            'previousMonthCommissions' => $previousMonthCommissions,
            'staffs' => StaffResources::collection($staff),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffCommissionRequest $request)
    {
        $staffCommission = $request->validated();

        StaffCommission::create($staffCommission);

        return redirect()->route('staff-commissions.index')->with('success', 'StaffCommission added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(StaffCommission $staffCommission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StaffCommission $staffCommission)
    {
        $thisMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();
        
        $staff = Staff::query()->orderBy('name', 'asc')->get();

        
        $thisMonthCommissions = Sale::selectRaw('staff_id, SUM(commission) as total')
            ->whereBetween('created_at', [$thisMonth, $thisMonth->copy()->endOfMonth()])
            ->groupBy('staff_id')
            ->get();
        
        $previousMonthCommissions = Sale::selectRaw('staff_id, SUM(commission) as total')
            ->whereBetween('created_at', [$previousMonth, $previousMonth->copy()->endOfMonth()])
            ->groupBy('staff_id')
            ->get();


        return inertia('Staff_commissions/Edit', [
            'staffCommission' => new StaffCommissionResources($staffCommission),
            'thisMonthCommissions'     => $thisMonthCommissions,
            'previousMonthCommissions' => $previousMonthCommissions,
            'staffs' => StaffResources::collection($staff),
        ]);
    }

    /**
     */
    public function update(UpdateStaffCommissionRequest $request, StaffCommission $staffCommission)
    {
        $staffCommission->update($request->validated());

        return to_route('staff-commissions.index')->with('updateMsg', 'Staff Commission was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StaffCommission $staffCommission)
    {
        $staffCommission->delete();

        return to_route('staff-commissions.index')->with('deleteMsg', 'Staff Commission was deleted successfuly');
    }
}
