<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository {

    public function getAll() 
    {
        return Product::get();
    }

    public function getWithDeleted() 
    {
        return Product::withDeleted()->get();
    }

    public function paginate($perPage) 
    {
        return Product::paginate($perPage);
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
        return $product->update(['is_deleted' => true]);
    }
}

