<?php

namespace App\Providers;

use App\Repositories\CustomerRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductionRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(OrderRepository::class);
        $this->app->singleton(ProductRepository::class);
        $this->app->singleton(CustomerRepository::class);
        $this->app->singleton(ProductionRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
