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

    public function getProductNumberOfOrder()
    {
        return DB::table('order_product')
            ->select(DB::raw('SUM(order_product.quantity) AS number_of_orders'), 'products.name') 
            ->rightJoin('products', 'products.id', '=', 'order_product.product_id')
            ->groupBy('products.id')
            ->orderBy('number_of_orders', 'desc')
            ->get(); 
    }

    public function getSalesByMonthForYear($year)
    {
        return DB::table('payments')
            ->select(DB::raw("
                TO_CHAR(payment_date, 'FMMonth') AS month,
                EXTRACT(MONTH FROM payment_date) AS month_number,
                SUM(payment_amount) AS total_sales
            "))
            ->whereYear('payment_date', $year)
            ->where('is_deleted', false) 
            ->groupByRaw("month, month_number")
            ->orderBy('month_number')
            ->get();
    }

    public function getAvailableYears()
    {
        return DB::table('payments')
            ->select(DB::raw('DISTINCT EXTRACT(YEAR FROM payment_date) as year'))
            ->orderByDesc('year')
            ->pluck('year');
    }

    public function getProductStocks()
    {
        return DB::table('products')
            ->leftJoinSub(
                DB::table('productions')
                    ->select('product_id', DB::raw('SUM(quantity_produced) as total_produced'))
                    ->groupBy('product_id'),
                'prod',
                'products.id',
                '=',
                'prod.product_id'
            )
            ->leftJoinSub(
                DB::table('order_product')
                    ->select('product_id', DB::raw('SUM(quantity) as total_sold'))
                    ->groupBy('product_id'),
                'ord',
                'products.id',
                '=',
                'ord.product_id'
            )
            ->select(
                'products.name',
                DB::raw('GREATEST(COALESCE(prod.total_produced, 0) - COALESCE(ord.total_sold, 0), 0) AS product_stocks')
            )
            ->get();
    }

}