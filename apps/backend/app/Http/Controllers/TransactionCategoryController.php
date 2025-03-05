<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\TransactionCategory;
use Illuminate\Http\Request;

class TransactionCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $categories = TransactionCategory::all();
        return ApiResponse::success($categories);
    }
}
