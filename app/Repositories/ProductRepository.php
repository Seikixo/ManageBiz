<?php

namespace App\Repositories;

use App\Models\Product;

class PublicRepository {

    public function getAll() {
        return Product::get();
    }

    public function paginate($perPage) {
        return Product::paginate( $perPage );
    }

    public function findById($id) {
        return Product::findOrFail($id);
    }

    public function create(array $data) {
        return Product::create($data);
    }

    public function update($id, array $data) {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete($id) {
        return Product::destroy($id);
    }
}

