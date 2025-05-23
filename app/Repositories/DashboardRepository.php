<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Models\Production;
use Illuminate\Support\Facades\DB;

class DashboardRepository
{

    public function getTotalSold()
    {
        $sold = DB::table('order_product')
            ->select(DB::raw('COALESCE(SUM(quantity), 0) AS total_sold'))
            ->where('is_deleted', '=', false)
            ->get();

        return $sold;
    }

    public function getTotalSales()
    {
        $sales = Payment::where('is_deleted', '=', false)
            ->whereNotIn('payment_status', ['Refund', 'Failed'])
            ->sum('payment_amount');

        return $sales;
    }

    public function getOverAllCost()
    {
        $overall_cost = Production::where('is_deleted', '=', false)->sum('overall_cost');

        return $overall_cost;
    }

    public function getProductNumberOfOrder()
    {
        return DB::table('order_product')
            ->select(
                DB::raw('COALESCE(SUM(order_product.quantity), 0) AS number_of_orders'), 
                'products.name', 
                'order_product.is_deleted'
            ) 
            ->where('order_product.is_deleted', '=', false) 
            ->rightJoin('products', 'products.id', '=', 'order_product.product_id')
            ->groupBy('products.id', 'products.name', 'order_product.is_deleted') 
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
            ->whereNotIn('payment_status', ['Refund', 'Failed'])
            ->groupByRaw("month, month_number")
            ->orderBy('month_number')
            ->get();
    }

    public function getAvailableYears()
    {
        return DB::table('payments')
            ->select(DB::raw('DISTINCT EXTRACT(YEAR FROM payment_date) AS year'))
            ->orderByDesc('year')
            ->pluck('year');
    }

    public function getProductStocks()
    {
        $productsStock = DB::table('products')
            ->leftJoinSub(
                DB::table('productions')
                    ->select('product_id', DB::raw('SUM(quantity_produced) as total_produced'))
                    ->where('productions.is_deleted', '=', false)
                    ->groupBy('product_id'),
                'prod',
                'products.id',
                '=',
                'prod.product_id'
            )
            ->leftJoinSub(
                DB::table('order_product')
                    ->select('product_id', DB::raw('SUM(quantity) as total_sold'))
                    ->where('order_product.is_deleted', '=', false)
                    ->groupBy('product_id'),
                'ord',
                'products.id',
                '=',
                'ord.product_id'
            )
            ->where('products.is_deleted', '=', false)
            ->select(
                'products.name',
                DB::raw('GREATEST(COALESCE(prod.total_produced, 0) - COALESCE(ord.total_sold, 0), 0) AS product_stocks')
            )
            ->get();

        $totalProductStock = $productsStock->sum('product_stocks');

        return[
            'productsStock' => $productsStock,
            'totalProductStock' => $totalProductStock,
        ];
    }

}