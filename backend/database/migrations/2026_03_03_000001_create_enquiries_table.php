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
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('service_providerss')->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->string('wedding_city');
            $table->date('wedding_date');
            $table->string('budget')->nullable();
            $table->json('interested_services')->nullable();
            $table->enum('status', ['pending', 'contacted', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();

            $table->index('provider_id');
            $table->index('customer_email');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
