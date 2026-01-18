<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Company;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResources;
use App\Http\Resources\CompanyResources;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $query = Product::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where("name", "like", "%" . request('name') . "%");
        }


        // if(request('id')){
        //     $query->where("id",  request('id'));
        // }


        
        $products = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Products/Index', [
            "products" => ProductResources::collection($products),
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

        return Inertia('Products/Create', [

            'companies' => CompanyResources::collection($company),

        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = $request->validated();

        Product::create($product);

        return redirect()->route('products.index')->with('success', 'Product added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        
        $company = Company::query()->orderBy('name', 'asc')->get();

        return Inertia('Products/Edit', [

            'product' => new ProductResources($product),
            'companies' => CompanyResources::collection($company),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        return to_route('products.index')->with('updateMsg', 'Product was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return to_route('products.index')->with('deleteMsg', 'Product was deleted successfuly');
    }
}
