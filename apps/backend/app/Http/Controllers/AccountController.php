<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        if ($request->query('role') === "agent") {
            $agentAccount = Account::whereRole($request->query('role'))->get();
            return ApiResponse::success($agentAccount);
        }
        $accounts = Account::all();
        return ApiResponse::success($accounts);
    }
}
