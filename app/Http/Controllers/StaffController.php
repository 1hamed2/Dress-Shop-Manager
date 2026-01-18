<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Http\Resources\StaffResources;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Staff::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where("name", "like", "%" . request('name') . "%");
        }


        
        $staffs = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Staff/Index', [
            "staffs" => StaffResources::collection($staffs),
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

        return Inertia('Staff/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffRequest $request)
    {
        $staff = $request->validated();

        Staff::create($staff);

        return redirect()->route('staff.index')->with('success', 'Staff added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {

        return Inertia('Staff/Edit', [

            'staff' => new StaffResources($staff),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $staff->update($request->validated());

        return to_route('staff.index')->with('updateMsg', 'Staff was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        return to_route('staff.index')->with('deleteMsg', 'Staff was deleted successfuly');
    }
}
