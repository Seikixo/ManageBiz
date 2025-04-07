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
        
        $totalProductStocks = $this->dashboardRepository->getTotalStocks();
        $totalSold = $this->dashboardRepository->getTotalSold();
        $totalSales = $this->dashboardRepository->getTotalSales();
        $overAllCost = $this->dashboardRepository->getOverAllCost();
        $productNumberOfOrders = $this->dashboardRepository->getProductNumberOfOrder();
        $salesByMonth = $this->dashboardRepository->getSalesByMonthForYear($year);
        $availableYears = $this->dashboardRepository->getAvailableYears();
        $productStocks = $this->dashboardRepository->getProductStocks();

        return Inertia::render('Dashboard/Dashboard', [
            'totalProductStocks' => $totalProductStocks,
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
