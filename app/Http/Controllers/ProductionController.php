<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductionRequest;
use App\Repositories\ProductionRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionController extends Controller
{
    protected $productionRepository;
    protected $productRepository;

    public function __construct(ProductionRepository $productionRepository, ProductRepository $productRepository)
    {
        $this->productionRepository = $productionRepository;
        $this->productRepository= $productRepository;
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
        $products = $this->productRepository->getAllName();
        return Inertia::render('Productions/ProductionsCreate', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductionRequest $request)
    {
        $validatedData = $request->validated();
        
        $this->productionRepository->create([
            'user_id' => Auth::id(),
            'product_id' => $validatedData['product_id'],
            'quantity_produced' => $validatedData['quantity_produced'],
            'production_date' => $validatedData['production_date'],
            'material_cost' => $validatedData['material_cost'],
            'production_cost' => $validatedData['production_cost'],
        ]);

        return redirect()->route('productions.index')->with('success', 'Production created successfully');
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
    public function edit($id)
    {
        $production = $this->productionRepository->findById($id);
        $products = $this->productRepository->getAllName();

        return Inertia::render('Productions/ProductionsEdit', [
            'production' => $production,
            'products' => $products
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductionRequest $request, $id)
    {
        $validatedData = $request->validated();

        $this->productionRepository->update($id, $validatedData);

        return redirect()->route('productions.index')->with('success', 'Production updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->productionRepository->softDelete($id);
        
        return redirect()->route('productions.index');
    }
}
