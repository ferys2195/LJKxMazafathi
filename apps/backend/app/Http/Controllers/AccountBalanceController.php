<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groupedAccounts = Account::get()->mapToGroups(function ($account) {
            return [$account->role => $account];
        });
        return ApiResponse::success($groupedAccounts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $account = Account::find($id);
        $transactions = $account->transactions()
            ->with('transactionCategory')
            ->orderBy('transaction_date', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(10);
        return ApiResponse::successWithInfo(compact('account'), $transactions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
