<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ImportItemController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\SystemSettingController;
use App\Http\Controllers\StaffCommissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('products', ProductController::class);
    Route::resource('imports', ImportController::class);
    Route::resource('import-items', ImportItemController::class);
    Route::resource('sales', SaleController::class);
    Route::resource('staff', StaffController::class);
    Route::resource('companies', CompanyController::class);
    Route::resource('expenses', ExpenseController::class);
    Route::resource('incomes', IncomeController::class);
    Route::resource('system-settings', SystemSettingController::class);
    Route::resource('staff-commissions', StaffCommissionController::class);


});

require __DIR__.'/auth.php';
