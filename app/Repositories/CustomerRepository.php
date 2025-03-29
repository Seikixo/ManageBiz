<?php

namespace App\Repositories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class CustomerRepository 
{
    public function getAllName()
    {
        return Customer::select('id', 'name')->get();
    }

    public function findById($id)
    {
        return Customer::findOrFail($id);
    }

    public function create(array $data)
    {
        return Customer::create($data);
    }

    public function update($id, array $data)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($data);
        return $customer;
    }

    public function softDelete($id)
    {
        $customer = Customer::findOrFail($id);     
        $customer->update(['is_deleted' => true]);
        return true;
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Customer::when($search, function (Builder $query) use ($search) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('contact_number', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
        })->latest()->paginate($perPage);
    }
}