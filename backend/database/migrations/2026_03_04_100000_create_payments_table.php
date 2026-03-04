<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')
                  ->constrained('service_providerss')
                  ->onDelete('cascade');
            // subscription length in months (6 or 12)
            $table->unsignedTinyInteger('duration_months');
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('completed');
            $table->string('transaction_id')->nullable();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};