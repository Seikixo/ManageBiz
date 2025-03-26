<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity'); // Quantity of product in the order
            $table->decimal('price_at_order', 10, 2); // Store price at the time of order
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('order_product');
    }
    
};
