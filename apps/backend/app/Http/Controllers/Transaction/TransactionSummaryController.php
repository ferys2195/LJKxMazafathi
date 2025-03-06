<?php

namespace App\Http\Controllers\Transaction;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionSummaryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'date_from' => 'required_with:date_to|date',
            'date_to' => 'required_with:date_from|date',
            'category' => 'nullable|exists:transaction_categories,id',
        ]);

        $summary = $this->getSummary($request);

        return ApiResponse::success([
            'totalIn' => (int) ($summary->totalIn ?? 0),
            'totalOut' => (int) ($summary->totalOut ?? 0),
        ]);
    }

    private function getSummary($request)
    {
        return Transaction::query()
            ->when($request->filled(['date_from', 'date_to']), function ($q) use ($request) {
                $q->whereBetween('transaction_date', [$request->date_from, $request->date_to]);
            })
            ->when($request->filled('category'), function ($q) use ($request) {
                $q->where('transaction_category_id', $request->category);
            })
            ->selectRaw("
            SUM(CASE WHEN transaction_type = 'In' THEN amount ELSE 0 END) as totalIn,
            SUM(CASE WHEN transaction_type = 'Out' THEN amount ELSE 0 END) as totalOut
        ")
            ->first();
    }
}
