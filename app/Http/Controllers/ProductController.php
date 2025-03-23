<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Repositories\ProductionRepository;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productRepository;
    protected $productionRepository;

    public function __construct(ProductRepository $productRepository, ProductionRepository $productionRepository)
    {
        $this->productRepository = $productRepository;
        $this->productionRepository = $productionRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try
        {
            $search = $request->query('search', '');
            $products = $this->productRepository->search($search)->toArray();
    
            return Inertia::render('Products/ProductsIndex', [
                'products' => $products,
                'search' => $search
            ]);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while fetching products details']);
        } 

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/ProductsCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        try
        {
            $validatedData = $request->validated();

            $this->productRepository->create([
                'user_id' => Auth::id(),
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'category' => $validatedData['category'],
                'price' => $validatedData['price'],
            ]);
    
            return redirect()->route('products.index')->with('success', 'Product created successfully!');
        }
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Database error: Unable to create product']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while creating product']);
        }

        
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
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
            $product = $this->productRepository->findById($id);

            return Inertia::render('Products/ProductEdit', [
                'product' => $product
            ]);
        }
        catch (ModelNotFoundException $e)
        {
            return redirect()->route('products.index')->withErrors(['error' => 'Product not found']);
        }
        catch (Exception $e)
        {
            return redirect()->route('products.index')->withErrors(['error' => 'Something went wrong while fetching the product details']);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, $id)
    {
        try
        {
            $validatedData = $request->validated();

            $this->productRepository->update($id, $validatedData);
    
            return redirect()->route('products.index')->with('success', 'Product updated successfully');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Product not found']);
        }
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Unable to update product']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while updating product']);
        }
       

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try
        {
            $this->productRepository->softDelete($id);
            return redirect()->route('products.index');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Product not found']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while deleting product']);
        }

    }
}
