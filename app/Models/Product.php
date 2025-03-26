<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name', 
        'description', 
        'category', 
        'price',
        'is_deleted'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function production()
    {
        return $this->hasMany(Production::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }

    protected static function booted() 
    {
        static::addGlobalScope('notDeleted', function(Builder $builder){
            $builder->where('is_deleted', false);
        });
    }

    public function restore() 
    {
        return $this->update(['is_deleted' => false]);
    }

    public function scopeWithDeleted($query)
    {
        return $query->withoutGlobalScope('notDeleted');
    }
}
