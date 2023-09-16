<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            "status" => "ok",
            "message" => "All Categories",
            "errors" => null,
            "data" => CategoryResource::collection($categories)
        ]);
    }

    public function store(CreateCategoryRequest $request)
    {
        $category = $request->createCategory();

        return response()->json([
            "status" => "ok",
            "message" => "Category created successfully",
            "errors" => null,
            "data" => CategoryResource::make($category)
        ], 201);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (empty($category)) {
            return response()->json([
                "status" => false,
                "message" => "Category not found",
                "errors" => "Category not found",
                "data" => null
            ], 404);
        }

        return response()->json([
            "status" => true,
            "message" => "Category retrieved successfully",
            "errors" => null,
            "data" => CategoryResource::make($category)
        ]);
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::find($id);

        if (empty($category)) {
            return response()->json([
                "status" => false,
                "message" => "Category not found",
                "errors" => "Category not found",
                "data" => null
            ], 404);
        }

        $category->update([
            'name' => $request->input('name', $category->name)
        ]);

        return response()->json([
            "status" => true,
            "message" => "Category updated successfully",
            "errors" => null,
            "data" => CategoryResource::make($category)
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (empty($category)) {
            return response()->json([
                "status" => false,
                "message" => "Category not found",
                "errors" => "Category not found",
                "data" => null
            ], 404);
        }

        $category->delete();

        return response()->json([
            "status" => true,
            "message" => "Category deleted successfully",
            "errors" => null,
            "data" => null
        ]);
    }
}
