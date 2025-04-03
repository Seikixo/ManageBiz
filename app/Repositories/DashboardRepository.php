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

    public function getSalesByDate($interval = 'year')
    {
        $dateFormat = match ($interval) {
            'year' => 'YYYY',
            'month' => 'YYYY-MM',
            'day' => 'YYYY-MM-DD',
            default => 'YYYY'
        };

        return DB::select("
            WITH date_series AS (
                SELECT generate_series(
                    (SELECT MIN(payment_date) FROM payments)::DATE,
                    (SELECT MAX(payment_date) FROM payments)::DATE,
                    '1 day'::INTERVAL
                )::DATE AS date
            )
            SELECT 
                TO_CHAR(ds.date, '{$dateFormat}') AS period,
                COALESCE(SUM(p.payment_amount), 0) AS total_sales
            FROM date_series ds
            LEFT JOIN payments p 
                ON ds.date = p.payment_date::DATE  -- Match directly using DATE
            GROUP BY period
            ORDER BY period ASC
        ");
    }

    
    
}