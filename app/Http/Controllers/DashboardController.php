<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\DashboardRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $dashboardRepository;

    public function __construct(DashboardRepository $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    public function index(Request $request)
    {

        $year = $request->query('year', now()->year);
        
        $totalSold = $this->dashboardRepository->getTotalSold();
        $totalSales = $this->dashboardRepository->getTotalSales();
        $overAllCost = $this->dashboardRepository->getOverAllCost();
        $productNumberOfOrders = $this->dashboardRepository->getProductNumberOfOrder();
        $salesByMonth = $this->dashboardRepository->getSalesByMonthForYear($year);
        $availableYears = $this->dashboardRepository->getAvailableYears();
        $productStocks = $this->dashboardRepository->getProductStocks();

        return Inertia::render('Dashboard/Dashboard', [
            'productStocks' => $productStocks,
            'totalSold' => $totalSold,
            'totalSales' => $totalSales,
            'overAllCost' => $overAllCost,
            'selectedYear' => (int) $year,
            'salesByMonth' => $salesByMonth,
            'availableYears' => $availableYears,
            'productNumberOfOrders' => $productNumberOfOrders,
        ]);
    }
}
