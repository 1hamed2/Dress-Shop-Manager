<?php

namespace App\Http\Controllers;

use App\Models\ImportItem;
use App\Models\Import;
use App\Models\Product;
use App\Http\Requests\StoreImportItemRequest;
use App\Http\Requests\UpdateImportItemRequest;
use App\Http\Resources\ImportItemResources;
use App\Http\Resources\ImportResources;
use App\Http\Resources\ProductResources;


class ImportItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = ImportItem::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if (request()->filled('product_id')) {
            $query->whereHas('product', function ($q) {
                $q->where('name', 'like', '%' . request('product_id') . '%');
            });
        }


        
        $importItems = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Import_items/Index', [
            "importItems" => ImportItemResources::collection($importItems),
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
        $product = Product::query()->orderBy('name', 'asc')->get();
        $import = Import::latest()->get();

        return Inertia('Import_items/Create', [

            'products' => ProductResources::collection($product),
            'imports' => ImportResources::collection($import),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImportItemRequest $request)
    {
        $importItem = $request->validated();

        ImportItem::create($importItem);

        return redirect()->route('import-items.index')->with('success', 'Item added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(ImportItem $importItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ImportItem $importItem)
    {
        $import = Import::query()->orderBy('company_id', 'asc')->get();
        $product = Product::query()->orderBy('name', 'asc')->get();

        return Inertia('Import_items/Edit', [

            'importItem' => new ImportItemResources($importItem),
            'imports' => ImportResources::collection($import),
            'products' => ProductResources::collection($product),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImportItemRequest $request, ImportItem $importItem)
    {
        $importItem->update($request->validated());

        return to_route('import-items.index')->with('updateMsg', 'Item was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ImportItem $importItem)
    {
        //
    }
}
