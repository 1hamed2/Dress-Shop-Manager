<?php

namespace App\Http\Controllers;

use App\Models\Import;
use App\Models\Company;
use App\Http\Requests\StoreImportRequest;
use App\Http\Requests\UpdateImportRequest;
use App\Http\Resources\CompanyResources;
use App\Http\Resources\ImportResources;


class ImportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Import::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');


        if (request()->filled('company_id')) {
            $query->whereHas('company', function ($q) {
                $q->where('name', 'like', '%' . request('company_id') . '%');
            });
        }


        
        $imports = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Imports/Index', [
            "imports" => ImportResources::collection($imports),
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
        $company = Company::query()->orderBy('name', 'asc')->get();

        return Inertia('Imports/Create', [

            'companies' => CompanyResources::collection($company),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImportRequest $request)
    {
        $import = $request->validated();

        Import::create($import);

        return redirect()->route('imports.index')->with('success', 'Import added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Import $import)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Import $import)
    {
        $company = Company::latest()->get();

        return Inertia('Imports/Edit', [

            'importss' => new ImportResources($import),
            'companies' => CompanyResources::collection($company),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImportRequest $request, Import $import)
    {
        $import->update($request->validated());

        return to_route('imports.index')->with('updateMsg', 'Import was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Import $import)
    {
        $import->delete();

        return to_route('imports.index')->with('deleteMsg', 'Import was deleted successfuly');
    }
}
