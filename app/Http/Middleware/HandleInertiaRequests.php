<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Expense;
use Carbon\Carbon;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            'dailySales' => fn () => Sale::whereDate('created_at', today())->sum('total_price'),

            'monthlyIncome' => function () {
                $monthlySales = Sale::whereYear('created_at', now()->year)
                    ->whereMonth('created_at', now()->month)
                    ->sum('total_price');

                $totalCommissions = Sale::whereYear('created_at', now()->year)
                    ->whereMonth('created_at', now()->month)->sum('commission');

                $monthlyExpenses = Expense::whereYear('created_at', now()->year)
                    ->whereMonth('created_at', now()->month)
                    ->sum('amount');

                return $monthlySales - $monthlyExpenses - $totalCommissions;
            },

            'lowStockCount' => fn () => Product::where('stock', '<=', 5)->count(),

            'todaysSalesCount' => fn () => Sale::whereDate('created_at', today())->sum('quantity'),
        ];
    }
}
