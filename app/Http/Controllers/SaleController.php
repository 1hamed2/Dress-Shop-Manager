<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Staff;
use App\Models\Product;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResources;
use App\Http\Resources\StaffResources;
use App\Http\Resources\ProductResources;


class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Sale::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if (request()->filled('product_id')) {
            $query->whereHas('product', function ($q) {
                $q->where('name', 'like', '%' . request('product_id') . '%');
            });
        }


        
        $sales = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Sales/Index', [
            "sales" => SaleResources::collection($sales),
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
        $product = Product::where('stock', '>', 0)->get();
        $staff = Staff::query()->orderBy('name', 'asc')->get();

        return Inertia('Sales/Create', [

            'products' => ProductResources::collection($product),
            'staffs' => StaffResources::collection($staff),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        $sale = $request->validated();

        Sale::create($sale);

        return redirect()->route('sales.index')->with('success', 'Sale added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        $product = Product::query()->orderBy('name', 'asc')->get();
        $staff = Staff::query()->orderBy('name', 'asc')->get();

        return Inertia('Sales/Edit', [

            'sale' => new SaleResources($sale),
            'products' => ProductResources::collection($product),
            'staffs' => StaffResources::collection($staff),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {

        $sale->update($request->validated());

        return to_route('sales.index')->with('updateMsg', 'Project was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();

        return to_route('sales.index')->with('deleteMsg', 'Sale was deleted successfuly');
    }
}
