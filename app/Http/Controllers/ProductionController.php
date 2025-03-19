<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductionRequest;
use App\Repositories\ProductionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionController extends Controller
{
    protected $productionRepository;

    public function __construct(ProductionRepository $productionRepository)
    {
        $this->productionRepository = $productionRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');

        $productions = $this->productionRepository->search($search)->toArray();

        return Inertia::render('Productions/ProductionsIndex', [
            'productions' => $productions,
            'search' => $search
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
    public function store(ProductionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Production $production)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Production $production)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductionRequest $request, Production $production)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Production $production)
    {
        //
    }
}
