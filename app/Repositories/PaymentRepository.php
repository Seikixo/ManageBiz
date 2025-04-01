<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class PaymentRepository 
{
    public function findByIdWithOrder($id)
    {
        return Payment::with('order.customer')->findOrFail($id);
    }

    public function getPaymentStatusCount()
    {
        $statuses = ['Paid', 'Pending', 'Refund', 'Failed'];

        $statusCounts = Payment::selectRaw('payment_status, COUNT(*) as status_count')
            ->groupBy('payment_status')
            ->get();
        
            $result = [];

            foreach ($statuses as $status) {
                $result[] = [
                    'status' => $status,
                    'count' => $statusCounts->where('payment_status', $status)->first()?->status_count ?? 0
                ];
            }
        
        return $result;
    }

    public function create(array $data)
    {
        return Payment::create($data);
    }

    public function update($id, array $data)
    {
        $payment = Payment::findOrFail($id);
    
        // Ensure customer exists if customer_id is being updated
        if (isset($data['customer_id']) && !Customer::where('id', $data['customer_id'])->exists()) {
            throw new ModelNotFoundException("Customer not found.");
        }
    
        $payment->update($data);
        
        return $payment;
    }
    

    public function softDelete($id)
    {
        $payment = Payment::findOrFail($id);     
        $payment->update(['is_deleted' => true]);

        return true;
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Payment::with('customer')
        ->when($search, fn (Builder $query) => 
        $query->whereHas('customer', fn (Builder $subQuery) =>
            $subQuery->where('name', 'like', "%{$search}%")
            )
       )->latest()->paginate($perPage);
        
    }
}