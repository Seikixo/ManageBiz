<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderRepository
{
    public function findById($id)
    {
        return Order::with(['customer', 'products'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Order::create($data);
    }

    public function update($id, array $data)
    {
        $production = Order::findOrFail($id);
        $production->update($data);
        return $production;
    }

    public function softDelete($id)
    {
        $production = Order::findOrFail($id);     
        $production->update(['is_deleted' => true]);
        
        return true;
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Order::with(['customer', 'products'])
        ->when($search, fn (Builder $query) => 
            $query->whereHas('customer', fn (Builder $subQuery) =>
                $subQuery->where('name', 'like', "%{$search}%")
           )
        )->latest()->paginate($perPage);
    }
}
