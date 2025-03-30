<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Controllers\Controller;
use App\Repositories\PaymentRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $paymentRepository;

    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try
        {
            $search = $request->query('search', '');
            $payments = $this->paymentRepository->search($search);
            return Inertia::render('Payments/PaymentsIndex',[
                'payments' => $payments,
                'search' => $search
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
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
