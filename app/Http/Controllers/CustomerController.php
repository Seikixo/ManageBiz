<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Repositories\CustomerRepository;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    protected $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
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
            $customers = $this->customerRepository->search($search)->toArray();

            return Inertia::render('Customers/CustomersIndex', [
                'customers' => $customers,
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
        return Inertia::render('Customers/CustomersCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $request)
    {
        try
        {
            $validatedData = $request->validated();
            $this->customerRepository->create([
                'user_id' => Auth::id(),
                'name' => $validatedData['name'],
                'address' => $validatedData['address'],
                'contact_number' => $validatedData['contact_number'],
                'email' => $validatedData['email'],
            ]);

            return redirect()->route('customers.index')->with('success', 'Customer created successfully!');
        }
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Database error: Unable to create customer']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while creating customer']);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
