<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'contact_number',
        'email',
        'is_deleted',
    ];

    public function order () 
    {
        return $this->hasMany(Order::class);
    } 

    protected static function booted() 
    {
        static::addGlobalScope('notDeleted', function(Builder $builder){
            $builder->where('is_deleted', false);
        });
    }
}
