<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductionRequest;
use App\Repositories\ProductionRepository;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
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
        try
        {
            $search = $request->query('search', '');
            $productions = $this->productionRepository->search($search)->toArray();
            $products = $this->productRepository->getAllName();
    
            return Inertia::render('Productions/ProductionsIndex', [
                'productions' => $productions,
                'search' => $search,
                'products' => $products
            ]);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while fetching productions details']);
        }
  
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductionRequest $request)
    {
        try
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
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Database Error: Unable to create proudciton']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while creating product']);
        }
        
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
        try
        {
            $production = $this->productionRepository->findById($id);
            $products = $this->productRepository->getAllName();

            return Inertia::render('Productions/ProductionsEdit', [
                'production' => $production,
                'products' => $products
            ]);
        }
        catch (ModelNotFoundException $e)
        {
            return redirect()->route('productions.index')->withErrors(['error' => 'Production not found']);
        }
        catch (Exception $e)
        {
            return redirect()->route('productions.index')->withErrors(['error' => 'Something went wrong while fetching the production details']);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductionRequest $request, $id)
    {
        try
        {
            $validatedData = $request->validated();

            $this->productionRepository->update($id, $validatedData);

            return redirect()->route('productions.index')->with('success', 'Production updated successfully');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Production not found']);
        }
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Unable to update production']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while updating production']);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try
        {
            $this->productionRepository->softDelete($id);
        
            return redirect()->route('productions.index');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Production not found']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while deleting production']);
        }

    }
}
