<?php

namespace App\Repositories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class CustomerRepository 
{
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
        $production = Customer::findOrFail($id);
        $production->update($data);
        return $production;
    }

    public function softDelete($id)
    {
        $production = Customer::findOrFail($id);     
        $production->update(['is_deleted' => true]);
        
        return true;
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Customer::when($search, 
            fn (Builder $query) =>
                $query->where('name', 'like', "%{$search}%")
        )->latest()->paginate($perPage);
    }
}