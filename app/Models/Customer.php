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

    public function orders() 
    {
        return $this->hasMany(Order::class);
    } 

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted() 
    {
        static::addGlobalScope('notDeleted', function(Builder $builder){
            $builder->where('is_deleted', false);
        });
    }
}
