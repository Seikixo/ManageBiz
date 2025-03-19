<?php

namespace App\Repositories;

use App\Models\Production;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductionRepository 
{
    public function findById($id)
    {
        return Production::findOrFail($id);
    }

    public function create(array $data)
    {
        return Production::create($data);
    }

    public function update($id, array $data)
    {
        $production = Production::findOrFail($id);
        $production->update($data);
        return $production;
    }

    public function softDelete($id)
    {
        $production = Production::findOrFail($id);     
        return $production->update(['is_deleted' => true]);
    }

    public function search(string $search, $perPage = 10): LengthAwarePaginator
    {
        return Production::with('product')
        ->when($search, fn (Builder $query) =>
             $query->whereHas('product', fn (Builder $subQuery) =>
                 $subQuery->where('name', 'like', "%{$search}%")
                )
        )
        ->paginate($perPage);
    }
}