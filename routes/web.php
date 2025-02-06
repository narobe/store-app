<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\registerController;
use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('pages.index');
});

Route::get('/register', [registerController::class, 'index'])->name('register')->middleware('guest');
Route::post('/register', [RegisterController::class, 'store'])->name('register')->middleware('guest');
Route::get('/login', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'authenticate'])->name('login')->middleware('guest');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index')->middleware('auth');
Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit')->middleware('auth');
Route::put('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update')->middleware('auth');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');

Route::resource('store', StoreController::class)->except('show', 'index')->middleware('auth');
Route::resource('store', StoreController::class)->only('show', 'index');
Route::resource('product', ProductController::class)->except('show', 'index')->middleware('auth');
Route::resource('product', ProductController::class)->only('show', 'index');
Route::post('product', [ProductController::class, 'filter'])->name('product.filter');
Route::resource('message', MessageController::class)->except('create', 'store')->middleware('auth');
Route::resource('message', MessageController::class)->only('create', 'store');
