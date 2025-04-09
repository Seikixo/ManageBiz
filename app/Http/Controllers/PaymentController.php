<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $paymentRepository;
    protected $orderRepository;

    public function __construct(PaymentRepository $paymentRepository, CustomerRepository $customerRepository, OrderRepository $orderRepository)
    {
        $this->paymentRepository = $paymentRepository;
        $this->orderRepository = $orderRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try
        {
            $search = $request->query('search', '');
            $payments = $this->paymentRepository->search($search)->toArray();
            $statusesCount = $this->paymentRepository->getPaymentStatusCount();

            return Inertia::render('Payments/PaymentsIndex',[
                'payments' => $payments,
                'search' => $search,
                'statusesCount' => $statusesCount
            ]);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in payments fetching: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while fetching payments detail']);
        } 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try{
            $orders = $this->orderRepository->getUnpaidOrdersPerCustomer();

            return Inertia::render('Payments/PaymentCreate', [
                'orders' => $orders,
            ]);    
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in payment creation: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while fetching Payments detail']);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request)
    {
        try
        {
            $validatedData = $request->validated();

            $this->paymentRepository->create($validatedData);
    
            return redirect()->route('payments.index')->with('success', 'Payment created successfully!');
        }
        catch (QueryException $e)
        {
            Log::error("Payment creation failed: " . $e->getMessage());
            return back()->withErrors(['error' => 'Database error: Unable to create Payment']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in Payment creation: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while creating Payment']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
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
            $payment = $this->paymentRepository->findByIdWithOrder($id);
            $orders = $this->orderRepository->getUnpaidOrdersPerCustomer();
            

            return Inertia::render('Payments/PaymentEdit', [
                'payment' => $payment,
                'orders' => $orders,
            ]);
        }
        catch (ModelNotFoundException $e)
        {
            return redirect()->route('payments.index')->withErrors(['error' => 'Payments not found']);
        }
        catch (Exception $e)
        {
            return redirect()->route('payments.index')->withErrors(['error' => 'Something went wrong while fetching the payments details']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentRequest $request, $id)
    {
        try
        {
            $validatedData = $request->validated();

            $this->paymentRepository->update($id, $validatedData);

            return redirect()->route('payments.index')->with('success', 'Payment updated successfully');
        }
        catch (ModelNotFoundException $e)
        {
            return back()->withErrors(['error' => 'Payment not found']);
        }
        catch (QueryException $e)
        {
            Log::error("Payment update failed: " . $e->getMessage());
            return back()->withErrors(['error' => 'Unable to update Payment']);      
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in Payment update: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while updating Payment']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try
        {
            $this->paymentRepository->softDelete($id);
        
            return redirect()->route('payments.index'); 
        }
        catch (ModelNotFoundException $e)
        {
            Log::error("Payment not found for deleting:: " . $e->getMessage());
            return back()->withErrors(['error' => 'payment not found']);
        }
        catch (Exception $e)
        {
            Log::error("Unexpected error in payment deleting: " . $e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while deleting payment']);
        }
    }
}
