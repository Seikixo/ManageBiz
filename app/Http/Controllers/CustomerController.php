<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Repositories\CustomerRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
            return back()->withErrors(['error' => 'Something went wrong while fetching Customers details']);
       }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/CustomerCreate');
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
        try
        {
            $customer = $this->customerRepository->findById($id);

            return Inertia::render('Customers/CustomerEdit', [
                'customer' => $customer
            ]);
        }
        catch (ModelNotFoundException $e)
        {
            return redirect()->route('customers.index')->withErrors(['error' => 'Customer not found']);
        }
        catch (Exception $e)
        {
            return redirect()->route('customers.index')->withErrors(['error' => 'Something went wrong while fetching the Customer details']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $request, $id)
    {
        try
        {
            $validatedData = $request->validated();

            $this->customerRepository->update($id, $validatedData);
    
            return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Customer not found']);
        }
        catch (QueryException $e)
        {
            return back()->withErrors(['error' => 'Unable to update Customer']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while updating Customer']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try
        {
            $this->customerRepository->softDelete($id);
            return redirect()->route('customers.index');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Customer not found']);
        }
        catch (Exception $e)
        {
            return back()->withErrors(['error' => 'Something went wrong while deleting customer']);
        }

    }
}
