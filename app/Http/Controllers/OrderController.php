<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    
    protected $orderRepository;
    protected $productRepository;
    protected $customerRepository;

    public function __construct(OrderRepository $orderRepository, ProductRepository $productRepository, CustomerRepository $customerRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->customerRepository = $customerRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try
        {
            $search = $request->query('search', '');
            $orders = $this->orderRepository->search($search)->toArray();
            return Inertia::render('Orders/OrdersIndex',[
                'orders' => $orders,
                'search' => $search
            ]);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order fetching: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while fetching orders detail']);
        } 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try{
            $products = $this->productRepository->getAllName();
            $customers = $this->customerRepository->getAllName();

            return Inertia::render('Orders/OrderCreate', [
                'products' => $products,
                'customers' => $customers
            ]);    
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order creation: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while fetching products and customers detail']);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        try
        {
            $validatedData = $request->validated();

            $this->orderRepository->createOrderWithProducts($validatedData);
    
            return redirect()->route('orders.index')->with('success', 'Order created successfully!');
        }
        catch (QueryException $e)
        {
            Log::error("Order creation failed: " . $e->getMessage());
            return back()->withErrors(['error' => 'Database error: Unable to create order']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order creation: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while creating order']);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
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
            $order = $this->orderRepository->findById($id);
            $products = $this->productRepository->getAllName();
            $customers = $this->customerRepository->getAllName();
            //dd([$order, $products, $customers]);

            return Inertia::render('Orders/OrderEdit', [
                'order' => $order,
                'products' => $products,
                'customers' => $customers
            ]);
        }
        catch (ModelNotFoundException $e)
        {
            Log::error("Order not found for editing: " . $e->getMessage());
            return redirect()->route('orders.index')->withErrors(['error' => 'Order not found']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order creation: " . $e->getMessage());
            return redirect()->route('orders.index')->withErrors(['error' => 'Something went wrong while editing order']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, $id)
    {
        try
        {
            $validatedData = $request->validated();
            $this->orderRepository->updateOrder($id, $validatedData);

            return redirect()->route('orders.index');
        }
        catch (ModelNotFoundException $e)
        {
            Log::error("Order not found for updating: " . $e->getMessage());
            return redirect()->route('orders.index')->withErrors(['error' => 'Order not found']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order update: " . $e->getMessage());
            return redirect()->route('orders.index')->withErrors(['error' => 'Something went wrong while updating order']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try
        {
            $this->orderRepository->softDelete($id);
        
            return redirect()->route('orders.index'); 
        }
        catch (ModelNotFoundException $e)
        {
            Log::error("Order not found for deleting: " . $e->getMessage());
            return back()->withErrors(['error' => 'Order not found']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in order deleting: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while deleting order']);
        }

    }
}
