<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Models\Production;
use Illuminate\Support\Facades\DB;

class DashboardRepository
{
    public function getTotalStocks()
    {
        $produced = Production::sum('quantity_produced');
        $sold = DB::table('order_product')->sum('quantity');

        return $produced - $sold;
    }

    public function getTotalSold()
    {
        $sold = DB::table('order_product')->sum('quantity');

        return $sold;
    }

    public function getTotalSales()
    {
        $sales = Payment::sum('payment_amount');

        return $sales;
    }

    public function getOverAllCost()
    {
        $overall_cost = Production::sum('overall_cost');

        return $overall_cost;
    }
}