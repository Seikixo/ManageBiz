<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'customer_id',
        'order_date',
        'total_price',
        'quantity',
        'status',
        'is_deleted',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')
                    ->withPivot('quantity', 'price_at_order') 
                    ->wherePivot('is_deleted', false)
                    ->withTimestamps();
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    } 

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    protected static function booted() 
    {
        static::addGlobalScope('notDeleted', function(Builder $builder){
            $builder->where('orders.is_deleted', false);
        });
    }
}
