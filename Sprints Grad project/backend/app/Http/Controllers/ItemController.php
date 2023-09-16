<?php

namespace App\Http\Controllers;

use App\Models\item;
use App\Models\item_Products;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class itemController extends Controller
{
    public function index()
    {
        $items = item::itemByDesc('id')->paginate(2);

        return response()->json([
            "status" => true,
            "message" => "All items",
            "errors" => null,
            "data" => $items
        ]);
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'customer_id' => 'required|integer|max:100|exists:customers,id',
            'customer_name' => 'required|string|max:100',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|regex:/^[0-9]{11}$/',
            'customer_address' => 'required|string|max:255',
            'products' => 'required|array',
            'products.*.id' => 'required|integer|max:100|exists:products,id',
            'products.*.quantity' => 'required|min:1',
            'products.*.price' => 'required|numeric',
            'products.*.subTotal' => 'required|numeric',
            'products.*.description' => 'nullable|string|max:255',
        ]);

        $total = array_sum(array_map(function ($product) {
            return $product['price'] * $product['quantity'];
        }, $request->products));

        try {
            DB::beginTransaction();

            $item = item::create([
                'customer_id' => $request->customer_id,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'customer_address' => $request->customer_address,
                'date' => Carbon::now()->toDateTimeString(),
                'total' => $total,
            ]);

            $itemProducts = [];
            foreach ($request->products as $product) {
                $itemProducts[] = item_Products::create([
                    'item_id' => $item->id,
                    'product_id' => $product['id'],
                    'description' => $product['description'] ?? null,
                    'product_price' => $product['price'],
                    'product_subTotal' => $product['subTotal'],
                    'product_quantity' => $product['quantity'],
                ]);
            }

            DB::commit();

            $item['products'] = $itemProducts;

            return response()->json([
                "status" => true,
                "message" => "item created successfully",
                "errors" => null,
                "data" => $item
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                "status" => false,
                "message" => "Failed to create the item",
                "errors" => $e->getMessage(),
                "data" => null
            ], 500);
        }
    }

    public function show($id)
    {
        $item = item::find($id);

        if (empty($item)) {
            return response()->json([
                "status" => false,
                "message" => "item not found",
                "errors" => "item not found",
                "data" => null
            ], 404);
        }

        $itemProducts = item_Products::where('item_id', $id)->get();
        $item['products'] = $itemProducts;

        return response()->json([
            "status" => true,
            "message" => "item retrieved successfully",
            "errors" => null,
            "data" => $item
        ]);
    }

    public function searchNumber($number)
    {
        $items = item::where('id', 'like', "%$number%")->get();

        return response()->json([
            "status" => true,
            "message" => "items retrieved successfully",
            "errors" => null,
            "data" => $items
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = $request->validate([
            'status' => ['required', Rule::in(['new', 'cancelled', 'completed'])],
        ]);

        $item = item::find($id);

        if (empty($item)) {
            return response()->json([
                "status" => false,
                "message" => "item not found",
                "errors" => "item not found",
                "data" => null
            ], 404);
        }

        $item->update(['status' => $request->status]);

        return response()->json([
            "status" => true,
            "message" => "item updated successfully",
            "errors" => null,
            "data" => $item
        ]);
    }
}
