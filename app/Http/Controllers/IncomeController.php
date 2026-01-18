<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Expense;
use App\Models\Sale;
use App\Http\Requests\StoreIncomeRequest;
use App\Http\Requests\UpdateIncomeRequest;
use App\Http\Resources\IncomeResources;


class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Income::query();

        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if(request('month')){
            $query->where("month", "like", "%" . request('month') . "%");
        }


        
        $incomes = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        
        return Inertia('Incomes/Index', [
            "incomes" => IncomeResources::collection($incomes),
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

        // ============= THIS MONTH =============
        $thisMonthSales = Sale::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('total_price');

        $thisMonthCommission = Sale::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('commission');

        $thisMonthExpenses = Expense::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        $thisMonthIncome = $thisMonthSales - $thisMonthCommission - $thisMonthExpenses;


        // ============= PREVIOUS MONTH =============
        $prevMonth = now()->subMonth();

        $prevSales = Sale::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('total_price');

        $prevCommission = Sale::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('commission');

        $prevExpenses = Expense::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('amount');

        $previousMonthIncome = $prevSales - $prevCommission - $prevExpenses;


        return inertia('Incomes/Create', [
            'thisMonthIncome'     => $thisMonthIncome,
            'previousMonthIncome' => $previousMonthIncome,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomeRequest $request)
    {
        $income = $request->validated();

        Income::create($income);

        return redirect()->route('incomes.index')->with('success', 'Income added successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income)
    {

         // ============= THIS MONTH =============
        $thisMonthSales = Sale::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('total_price');

        $thisMonthCommission = Sale::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('commission');

        $thisMonthExpenses = Expense::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        $thisMonthIncome = $thisMonthSales - $thisMonthCommission - $thisMonthExpenses;


        // ============= PREVIOUS MONTH =============
        $prevMonth = now()->subMonth();

        $prevSales = Sale::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('total_price');

        $prevCommission = Sale::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('commission');

        $prevExpenses = Expense::whereYear('created_at', $prevMonth->year)
            ->whereMonth('created_at', $prevMonth->month)
            ->sum('amount');

        $previousMonthIncome = $prevSales - $prevCommission - $prevExpenses;

        return Inertia('Incomes/Edit', [

            'income' => new IncomeResources($income),
            'thisMonthIncome'     => $thisMonthIncome,
            'previousMonthIncome' => $previousMonthIncome,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncomeRequest $request, Income $income)
    {
        $income->update($request->validated());

        return to_route('incomes.index')->with('updateMsg', 'Income was updated successfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        $income->delete();

        return to_route('incomes.index')->with('deleteMsg', 'Income was deleted successfuly');
    }
}
