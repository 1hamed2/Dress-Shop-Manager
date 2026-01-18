<?php

namespace App\Http\Controllers;

use App\Models\SystemSetting;
use App\Http\Requests\StoreSystemSettingRequest;
use App\Http\Requests\UpdateSystemSettingRequest;
use App\Http\Resources\SystemSettingResources;


class SystemSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = SystemSetting::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');
     
        $settings = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('System-settings/Index', [
            "settings" => SystemSettingResources::collection($settings),
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

        return Inertia('System-settings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemSettingRequest $request)
    {
        $setting = $request->validated();

        SystemSetting::create($setting);

        return redirect()->route('system-settings.index')->with('success', 'System Setting added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(SystemSetting $systemSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SystemSetting $systemSetting)
    {

        return Inertia('System-settings/Edit', [

            'setting' => new SystemSettingResources($systemSetting),

        ]);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemSettingRequest $request, SystemSetting $systemSetting)
    {
        $systemSetting->update($request->validated());

        return to_route('system-settings.index')->with('updateMsg', 'System setting was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SystemSetting $systemSetting)
    {
        $systemSetting->delete();

        return to_route('system-settings.index')->with('deleteMsg', 'System setting was deleted successfuly');
    }
}
