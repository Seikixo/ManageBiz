<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity_produced',
        'production_date',
        'material_cost',
        'production_cost',
        'overall_cost',
        'is_deleted'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($production) {
            $production->overall_cost = $production->material_cost + $production->production_cost;
        });

        static::updating(function ($production) {
            $production->overall_cost = $production->material_cost + $production->production_cost;
        });
    }

    public static function booted()
    {
        static::addGlobalScope('notDeleted', function(Builder $builder){
            $builder->where('is_deleted', false);
        });
    }
}
