<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResources;


class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Expense::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if(request('title')){
            $query->where("title", "like", "%" . request('title') . "%");
        }


        
        $expenses = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Expenses/Index', [
            "expenses" => ExpenseResources::collection($expenses),
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

        return Inertia('Expenses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $expense = $request->validated();

        Expense::create($expense);

        return redirect()->route('expenses.index')->with('success', 'Expense added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {

        return Inertia('Expenses/Edit', [

            'expense' => new ExpenseResources($expense),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $expense->update($request->validated());

        return to_route('expenses.index')->with('updateMsg', 'Expense was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return to_route('expenses.index')->with('deleteMsg', 'Expense was deleted successfuly');
    }
}
