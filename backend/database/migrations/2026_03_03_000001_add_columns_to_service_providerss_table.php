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
        Schema::table('service_providerss', function (Blueprint $table) {
            $table->string('city')->nullable()->after('contact');
            $table->string('area')->nullable()->after('city');
            $table->decimal('price', 10, 2)->nullable()->after('area');
            $table->string('price_type')->nullable()->after('price');
            $table->decimal('rating', 2, 1)->default(0)->after('price_type');
            $table->integer('reviews_count')->default(0)->after('rating');
            $table->boolean('is_featured')->default(false)->after('reviews_count');
            $table->integer('portfolio_count')->default(0)->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_providerss', function (Blueprint $table) {
            $table->dropColumn([
                'city',
                'area',
                'price',
                'price_type',
                'rating',
                'reviews_count',
                'is_featured',
                'portfolio_count'
            ]);
        });
    }
};
