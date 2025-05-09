<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository 
{

    public function getAllName()
    {
        return Product::select('id', 'name')->get();
    }

    public function getWithDeleted() 
    {
        return Product::withDeleted()->get();
    }
    
    public function findById($id) 
    {
        return Product::findOrFail($id);
    }

    public function create(array $data) 
    {
        return Product::create($data);
    }

    public function update($id, array $data) 
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function softDelete($id) 
    {
        $product = Product::findOrFail($id);
        $product->update(['is_deleted' => true]);
        $product->production()->update(['is_deleted' => true]);

        return true;
    }

    public function search(string $search, int $perPage = 10): LengthAwarePaginator
    {
        return Product::when($search, 
            fn (Builder $query) => 
                $query->where('name', 'like', "%{$search}%")
        )->latest()->paginate($perPage);
    }
}

