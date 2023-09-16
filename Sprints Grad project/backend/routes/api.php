<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('site.')->prefix('site')->group(function () {
    Route::post('register', 'AuthController@UserRegister')->name('register');
    Route::post('login', 'AuthController@UserLogin')->name('login');
    Route::get('logout', 'AuthController@logout')->middleware('auth:sanctum')->name('logout');

  
    Route::apiResource('products', ProductController::class)->only(['show', 'index']);
    Route::get('products/search/{name}', 'ProductController@searchName');

   
    Route::apiResource('orders', OrderController::class)->only('store')->middleware('auth:sanctum');
});

