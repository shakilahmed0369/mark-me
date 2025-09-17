<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);
Route::post('get-url-info', \App\Http\Controllers\Api\UrlInfoController::class);
