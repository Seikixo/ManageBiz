<?php

namespace App\Models;

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
        'location',
        'status',
        'is_deleted',
    ];
}
