<?php

namespace App\Repositories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class PaymentRepository 
{
    public function findById($id)
    {
        return Payment::findOrFail($id);
    }

    public function create(array $data)
    {
        return Payment::create($data);
    }

    public function update($id, array $data)
    {
        $payment = Payment::findOrFail($id);
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